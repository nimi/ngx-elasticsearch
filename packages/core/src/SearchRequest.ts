import { ESTransport } from "./transport"
import { ImmutableQuery } from "./query"
import { SearchManager } from "./SearchManager";

export class SearchRequest {
  active: boolean = true;

  constructor(
    public transport: ESTransport,
    public query: ImmutableQuery,
    public searchManager: SearchManager
  ){ }

  run() {
    console.log('runnnnn');
    return this.transport.search(this.query)
      .then((q) => { console.log('SEARCH RESULTS', q); return q; })
      .then(this.setResults.bind(this))
      .catch(this.setError.bind(this));
  }

  deactivate() {
    this.active = false;
  }

  setResults(results: any) {
    console.log('RESULTOS', results);
    if(this.active){
      this.searchManager.setResults(results);
    }
  }

  setError(error: any) {
    console.log('ERRRRROOOOOORRRRR', error);

    if(this.active){
      this.searchManager.setError(error);
    }
  }


}
