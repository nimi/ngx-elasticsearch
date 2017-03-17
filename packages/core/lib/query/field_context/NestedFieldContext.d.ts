import { FieldContext } from './FieldContext';
export declare class NestedFieldContext extends FieldContext {
    constructor(fieldOptions: any);
    getAggregationPath(): string;
    wrapAggregations(...aggregations: any[]): {
        [x: number]: any;
    }[];
    wrapFilter(filter: any): {
        nested: {
            path: string;
            query: any;
        };
    };
}
