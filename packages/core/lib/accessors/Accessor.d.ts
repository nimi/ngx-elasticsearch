import { ImmutableQuery } from "../query/ImmutableQuery";
import { SearchkitManager } from "../SearchManager";
export declare class Accessor {
    searchkit: SearchkitManager;
    uuid: string;
    results: any;
    active: boolean;
    translations: Object;
    refCount: number;
    constructor();
    incrementRef(): void;
    decrementRef(): void;
    setActive(active: boolean): this;
    setSearchkitManager(searchkit: any): void;
    translate(key: any, interpolations?: any): string;
    getResults(): any;
    setResults(results: any): void;
    getAggregations(path: any, defaultValue: any): any;
    beforeBuildQuery(): void;
    buildSharedQuery(query: ImmutableQuery): ImmutableQuery;
    buildOwnQuery(query: ImmutableQuery): ImmutableQuery;
}
