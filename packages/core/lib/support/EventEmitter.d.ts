export declare class EventEmitter {
    listeners: Function[];
    addListener(fn: Function): () => Function[];
    trigger(...args: any[]): void;
}
