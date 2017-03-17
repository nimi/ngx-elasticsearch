import { FieldContext } from "./FieldContext";
export declare class EmbeddedFieldContext extends FieldContext {
    getAggregationPath(): undefined;
    wrapAggregations(...aggregations: any[]): any[];
    wrapFilter(filter: any): any;
}
