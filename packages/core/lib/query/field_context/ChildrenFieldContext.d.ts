import { FieldContext } from './FieldContext';
export declare class ChildrenFieldContext extends FieldContext {
    constructor(fieldOptions: any);
    getAggregationPath(): string;
    wrapAggregations(...aggregations: any[]): {
        [x: number]: any;
    }[];
    wrapFilter(filter: any): {
        has_child: {
            type: string;
            query: any;
        };
    };
}
