import {Accessor} from './Accessor';
import {TopHitsMetric, ImmutableQuery} from '../query';

export class NoFiltersHitCountAccessor extends Accessor {
  aggsKey: string = 'no_filters_top_hits';

  getCount(){
    return this.getAggregations([this.aggsKey, 'hits', 'total'], 0);
  }

  buildOwnQuery(query: ImmutableQuery) {
    if(query.getQueryString() && query.getSelectedFilters().length > 0) {
      return query.setAggs(TopHitsMetric(this.aggsKey,{
        size:1, _source:false
      }));
    }
    return query;
  }
}
