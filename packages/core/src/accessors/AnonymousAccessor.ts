import {Accessor} from "./Accessor";

export class AnonymousAccessor extends Accessor {

  constructor(buildSharedQuery: any) {
    super();
    if (buildSharedQuery) {
      this.buildSharedQuery = buildSharedQuery;
    }
  }
}
