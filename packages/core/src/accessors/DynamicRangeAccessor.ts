import {FilterBasedAccessor} from './FilterBasedAccessor';
import {ObjectState} from '../state';

import {
	FilterBucket,
	RangeQuery,
	BoolMust,
	StatsMetric,
	FieldOptions,
	FieldContext,
	FieldContextFactory,
	ImmutableQuery
} from '../query';

import {maxBy, get} from 'lodash';

export interface DynamicRangeAccessorOptions {
	title: string
	id: string
	field: string
	fieldOptions?: FieldOptions
}

export class DynamicRangeAccessor extends FilterBasedAccessor<ObjectState> {
	options: any;
	fieldContext: FieldContext;
	state: ObjectState = new ObjectState({});

	constructor(key: any, options:DynamicRangeAccessorOptions) {
    super(key, options.id);
    this.options = options;
		this.options.fieldOptions = this.options.fieldOptions || {type:'embedded'};
    this.options.fieldOptions.field = this.options.field;
    this.fieldContext = FieldContextFactory(this.options.fieldOptions);
  }

	buildSharedQuery(query: any) {
		if (this.state.hasValue()) {
			let val:any = this.state.getValue();
			let rangeFilter = this.fieldContext.wrapFilter(RangeQuery(this.options.field, {
        gte:val.min, lte:val.max
      }));
			let selectedFilter = {
				name:this.translate(this.options.title),
				value:`${val.min} - ${val.max}`,
				id:this.options.id,
				remove:()=> {
					this.state = this.state.clear()
				}
			};

			return query
				.addFilter(this.key, rangeFilter)
				.addSelectedFilter(selectedFilter);

		}

		return query;
	}

  getStat(stat: any) {
    return this.getAggregations([
			this.key,
			this.fieldContext.getAggregationPath(),
			this.key, stat],0 );
  }

	isDisabled() {
		return (this.getStat('count') === 0) || (this.getStat('min') === this.getStat('max'));
	}

  buildOwnQuery(query: any) {
			let otherFilters = query.getFiltersWithoutKeys(this.key);

			return query.setAggs(FilterBucket(
				this.key,
				otherFilters,
				...this.fieldContext.wrapAggregations(					
					StatsMetric(this.key, this.options.field)
				)
			));
	}
}
