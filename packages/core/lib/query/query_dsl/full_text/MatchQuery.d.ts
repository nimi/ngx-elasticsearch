export interface MatchQueryOptions {
    operator?: string;
    zero_terms_query?: string;
    analyzer?: string;
    type?: string;
    cutoff_frequency?: number;
    max_expansions?: number;
}
export declare function MatchQuery(field: any, query: any, options?: MatchQueryOptions): {
    match: {
        [x: number]: {
            operator?: string | undefined;
            zero_terms_query?: string | undefined;
            analyzer?: string | undefined;
            type?: string | undefined;
            cutoff_frequency?: number | undefined;
            max_expansions?: number | undefined;
            query: any;
        };
    };
} | undefined;
