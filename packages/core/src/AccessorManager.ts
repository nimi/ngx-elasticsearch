import { Accessor, StatefulAccessor, BaseQueryAccessor, noopQueryAccessor } from './accessors';
import * as Utils from './utils';
import { ImmutableQuery } from './query';
import { filter, values, reduce, assign, each, without, find } from 'lodash';

type StatefulAccessors = Array<StatefulAccessor<any>>

export class AccessorManager {
  accessors: Accessor[] = [];
  statefulAccessors: any = {};
  queryAccessor: BaseQueryAccessor = noopQueryAccessor;

  getAccessors() {
    return this.accessors;
  }

  getActiveAccessors() {
    return filter(this.accessors, {active:true});
  }

  getStatefulAccessors() {
    return values(this.statefulAccessors) as StatefulAccessors;
  }

  getAccessorsByType(type: any) {
    return filter(this.accessors, Utils.instanceOf(type));
  }

  getAccessorByType(type: any) {
    return find(this.accessors, Utils.instanceOf(type));
  }

  add(accessor: any) {
    if (accessor instanceof StatefulAccessor) {
      if (accessor instanceof BaseQueryAccessor && accessor.key === 'q') {
        if(this.queryAccessor !== noopQueryAccessor){
          throw new Error('Only a single instance of BaseQueryAccessor is allowed');
        } else {
          this.queryAccessor = accessor;
        }
      }
      let existingAccessor = this.statefulAccessors[accessor.key];
      if (existingAccessor) {
        existingAccessor.incrementRef();
        return existingAccessor;
      } else {
        this.statefulAccessors[accessor.key] = accessor;
      }
    }
    accessor.incrementRef();
    this.accessors.push(accessor);
    return accessor;
  }

  remove(accessor: any) {
    if(!accessor){ return; }

    accessor.decrementRef();
    if (accessor.refCount === 0) {
      if (accessor instanceof StatefulAccessor) {
        if (this.queryAccessor == accessor) {
          this.queryAccessor = noopQueryAccessor;
        }
        delete this.statefulAccessors[accessor.key];
      }
      this.accessors = without(this.accessors, accessor);
    }
  }

  getState() {
    return reduce(this.getStatefulAccessors(), (state: any, accessor: any) => {
      return assign(state, accessor.getQueryObject())
    }, {});
  }

  setState(state: any) {
    each(
      this.getStatefulAccessors(),
      (accessor: any) => accessor.fromQueryObject(state)
    );
  }
  notifyStateChange(oldState: any) {
    each(
      this.getStatefulAccessors(),
      (accessor: any) => accessor.onStateChange(oldState)
    );
  }

  getQueryAccessor(){
    return this.queryAccessor;
  }

  buildSharedQuery(query: any) {
    return reduce(this.getActiveAccessors(), (query, accessor) => {
      return accessor.buildSharedQuery(query)
    }, query);
  }

  buildOwnQuery(query: any) {
    return reduce(this.getActiveAccessors(), (query, accessor) => {
      return accessor.buildOwnQuery(query)
    }, query);
  }

  buildQuery() {
    each(this.getActiveAccessors(), accessor => accessor.beforeBuildQuery());
    return this.buildOwnQuery(
      this.buildSharedQuery(new ImmutableQuery())
    );
  }

  setResults(results: any) {
    each(this.accessors, a => a.setResults(results));
  }

  resetState() {
    each(this.getStatefulAccessors(), a => a.resetState());
  }

}
