import { Accessor } from './Accessor';

export class AnonymousAccessor extends Accessor {
  constructor(buildSharedQuery: any) {
    super();
    this.buildSharedQuery = buildSharedQuery ? buildSharedQuery : this.buildSharedQuery;
  }
}
