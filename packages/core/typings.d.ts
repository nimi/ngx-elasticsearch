declare var qs: QueryString;

declare namespace QueryString {
    interface StringifyOptions {
        allowDots?: boolean;
        delimiter?: string;
        strictNullHandling?: boolean;
        skipNulls?: boolean;
        encode?: boolean;
        encoder?: (str: string) => any;
        encodeValuesOnly?: boolean;
        filter?: Array<string | number> | ((prefix: string, value: any) => any);
        arrayFormat?: 'indices' | 'brackets' | 'repeat';
        format?: any;
        indices?: boolean;
        serializeDate?: Function;
        sort?: (a: any, b: any) => number;
    }

    interface ParseOptions {
        delimiter?: string | RegExp;
        depth?: number;
        decoder?: (str: string) => any;
        arrayLimit?: number;
        parseArrays?: boolean;
        allowDots?: boolean;
        plainObjects?: boolean;
        allowPrototypes?: boolean;
        parameterLimit?: number;
        strictNullHandling?: boolean;
        ignoreQueryPrefix?: RegExp | string;
    }

    function stringify(obj: any, options?: StringifyOptions): string;
    function parse(str: string, options?: ParseOptions): any;
}