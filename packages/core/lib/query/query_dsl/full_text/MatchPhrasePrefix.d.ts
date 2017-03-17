export declare function MatchPhrasePrefix(query: any, str: string): {
    match_phrase_prefix: {
        [x: string]: {
            query: any;
            boost: number;
        };
    };
} | undefined;
