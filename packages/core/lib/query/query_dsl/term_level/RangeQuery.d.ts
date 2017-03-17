export interface RangeQueryOptions {
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    boost?: number;
    format?: string;
    time_zone?: string;
}
export declare function RangeQuery(key: string, options: RangeQueryOptions): {
    range: {
        [x: string]: RangeQueryOptions;
    };
};
