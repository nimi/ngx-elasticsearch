export interface FieldOptions {
  type: string,
  field?: string,
  options?: any
}

export interface FieldContext {
  getAggregationPath(): any
  wrapAggregations(...aggs: any[]): Array<any>
  wrapFilter(filter: any): any
}
