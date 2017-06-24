import { ESTransport } from './transport'
import { ImmutableQuery } from './query'
import { SearchManager } from './SearchManager';

/**
 * @name SearchRequest
 * @description
 * 
 * State wrapper tree structures, trees are mutated
 * with a set of immutability helpers.
 */
export class SearchRequest {
  /**
   * @name active
   * @description active state of the request
   */
  active: boolean = true;

  constructor(
    public transport: ESTransport,
    public query: ImmutableQuery,
    public searchManager: SearchManager
  ){ }

  /**
   * @name run
   * @description
   * Run the search request and handle response
   */
  public run() {
    return this.transport.search(this.query)
      .then(this.setResults.bind(this))
      .catch(this.setError.bind(this));
  }

  /**
   * @name deactivate
   * @description
   * deactivate setting results and error in manager state
   */
  public deactivate() {
    this.active = false;
  }

  /**
   * @name setResults
   * @description Set results in search manager
   */
  private setResults(results: any) {
    console.log('RESULTS', results);
    if(this.active){
      this.searchManager.setResults(results);
    }
  }

  /**
   * @name setError
   * @description Set error state in manager
   */
  private setError(error: any) {
    if(this.active){
      this.searchManager.setError(error);
    }
  }


}
