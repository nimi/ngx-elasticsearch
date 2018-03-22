export abstract class ESTransport {
  abstract search(query:Object): any
}

export interface IESTransport {
  search: Function;
}
