import { AggsContainer } from './AggsContainer';

export function FieldMetricFactory(metricOp: string) {
  return (key: string, field: string) => {
    return AggsContainer(key, {
      [metricOp]: { field }
    });
  };
}

export const CardinalityMetric = FieldMetricFactory('cardinality');
export const MinMetric = FieldMetricFactory('min');
export const MaxMetric = FieldMetricFactory('max');
export const AvgMetric = FieldMetricFactory('avg');
export const SumMetric = FieldMetricFactory('sum');
export const StatsMetric = FieldMetricFactory('stats');

export interface TopHitsMetricOptions {
  size: number
  from?: number
  _source?: any
  sort?: any
  [prop:string]: any
}

export function TopHitsMetric(key: string, top_hits: TopHitsMetricOptions) {
  return AggsContainer(key, { top_hits });
}

export function GeoBoundsMetric(key: string, field: string, options={}) {
  return AggsContainer(key, { geo_bounds: { field, ...options } } );
}
