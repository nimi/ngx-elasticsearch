import { ESTransport } from './transport'
import { ImmutableQuery } from './query'
import { SearchManager } from './SearchManager';

export class SearchRequest {
  active: boolean = true;

  constructor(
    public transport: ESTransport,
    public query: ImmutableQuery,
    public searchManager: SearchManager
  ){ }

  run() {
    return this.transport.search(this.query)
      .then(this.setResults.bind(this))
      .catch(this.setError.bind(this));
  }

  deactivate() {
    this.active = false;
  }

  setResults(results: any) {
    console.log('RESULTS', results);
    if(this.active){
      this.searchManager.setResults(results);
    }
  }

  setError(error: any) {
    if(this.active){
      this.searchManager.setError(error);
    }
  }


}
