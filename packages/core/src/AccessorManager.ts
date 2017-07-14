import { Accessor, StatefulAccessor, BaseQueryAccessor, noopQueryAccessor } from './accessors';
import { instanceOf } from './utils';
import { ImmutableQuery } from './query';
import { filter, values, reduce, assign, each, without, find } from 'lodash';

type StatefulAccessors = Array<StatefulAccessor<any>>

/**
 * @name AccessorManager
 * @description
 *
 * The accessor manager handles adding, removing, getting and building
 * queries with accessors. It's used by the SearchManager
 * 
 */
export class AccessorManager {
  accessors: Accessor[] = [];
  statefulAccessors: any = {};
  queryAccessor: BaseQueryAccessor = noopQueryAccessor;

  /**
   * @name getAccessors
   * @description Getter for the accessors state
   */
  getAccessors() {
    return this.accessors;
  }

  /**
   * @name getActiveAccessors
   * @description Getter for accessors that are currently active
   */
  getActiveAccessors() {
    return filter(this.accessors, {active:true});
  }

  /**
   * @name getStatefulAccessors
   * @description Getter for accessors that are stateful
   */
  getStatefulAccessors() {
    return values(this.statefulAccessors) as StatefulAccessors;
  }

  /**
   * @name getAccessorsByType
   * @description Getter for accessors of a certain type
   */
  getAccessorsByType(type: any) {
    return filter(this.accessors, instanceOf(type));
  }

  /**
   * @name getAccessorByType
   * @description Getter for accessors of certain type
   */
  getAccessorByType(type: any) {
    return find(this.accessors, instanceOf(type));
  }

  /**
   * @name add
   * @description Adds an accessor to internal accessors state
   */
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

  /**
   * @name remove
   * @description Removes an accessor from the list accessors state
   */
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

  /**
   * @name getState
   * @description Gets the state of the query from stateful accessors
   */
  getState() {
    return reduce(this.getStatefulAccessors(), (state: any, accessor: any) => {
      return assign(state, accessor.getQueryObject())
    }, {});
  }

  /**
   * @name setState
   * @description Sets the state of the stateful accessors
   * @param state
   */
  setState(state: any) {
    each(
      this.getStatefulAccessors(),
      (accessor: any) => accessor.fromQueryObject(state)
    );
  }

  /**
   * @name notifyStateChange
   * @description Notify stateful accessors of state change
   * @param oldState 
   */
  notifyStateChange(oldState: any) {
    each(
      this.getStatefulAccessors(),
      (accessor: any) => accessor.onStateChange(oldState)
    );
  }

  /**
   * @name getQueryAccessor
   * @description Get the query accessor state
   */
  getQueryAccessor(){
    return this.queryAccessor;
  }

  /**
   * @name buildSharedQuery
   * @description Builds a shared query
   * @param query 
   */
  buildSharedQuery(query: any) {
    return reduce(this.getActiveAccessors(), (query, accessor) => {
      return accessor.buildSharedQuery(query)
    }, query);
  }

  /**
   * @name buildSharedQuery
   * @description Builds a shared query
   * @param query 
   */
  buildOwnQuery(query: any) {
    return reduce(this.getActiveAccessors(), (query, accessor) => {
      return accessor.buildOwnQuery(query)
    }, query);
  }

  /**
   * @name buildQuery
   * @description Builds a shared query
   * @param query 
   */
  buildQuery() {
    each(this.getActiveAccessors(), accessor => accessor.beforeBuildQuery());
    return this.buildOwnQuery(
      this.buildSharedQuery(new ImmutableQuery())
    );
  }

  /**
   * @name setResults
   * @description Sets the result state of all accessors
   * @param results
   */
  setResults(results: any) {
    each(this.accessors, a => a.setResults(results));
  }

  /**
   * @name resetState
   * @description Resets the state of all stateful accessors
   */
  resetState() {
    each(this.getStatefulAccessors(), a => a.resetState());
  }

}
