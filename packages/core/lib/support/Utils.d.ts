export declare class Utils {
    static guidCounter: number;
    static guid(prefix?: string): string;
    static collapse(collection: any[], seed: any): any;
    static instanceOf(klass: any): (val: any) => boolean;
    static interpolate(str: string, interpolations: any): string;
    static translate(key: string, interpolations?: any): string;
    static computeOptionKeys(options: any[], fields: any[], defaultKey: string): any[];
    static generateKeyFromFields(ob: any, fields: any[], defaultKey: string): any;
}
