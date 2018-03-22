import { State } from '../state';
import { ImmutableQuery } from '../query/ImmutableQuery';
import { Accessor } from './Accessor';
import { SearchManager } from '../SearchManager';

export class StatefulAccessor<T extends State<any>> extends Accessor {
  key: string;
  urlKey: string;
  state: T;
  resultsState: T;

  constructor(key: string, urlString?: string){
    super()
    this.key = key;
    this.uuid = this.key + this.uuid;
    this.urlKey = urlString || key && key.replace(/\./g, '_');
    this.urlWithState = this.urlWithState.bind(this);
  }

  onStateChange(oldState: any) { }

  fromQueryObject(ob: any) {
    let value = ob[this.urlKey];
    this.state = this.state.setValue(value);
  }

  getQueryObject() {
    let val = this.state.getValue();
    return (val)
      ? { [this.urlKey]:val }
      : {};
  }

  setSearchManager(search: SearchManager) {
    super.setSearchManager(search);
    this.setResultsState();
  }

  setResults(results: any) {
    super.setResults(results);
    this.setResultsState();
  }

  setResultsState() {
    this.resultsState = this.state;
  }

  resetState() {
    this.state = this.state.clear();
  }

  urlWithState(state: T) {
    return this.searchManager.buildSearchUrl({ [this.urlKey]: state });
  }

}
