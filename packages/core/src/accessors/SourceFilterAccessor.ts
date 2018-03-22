import {Accessor} from './Accessor';
import {SourceFilterType} from '../query';

export class SourceFilterAccessor extends Accessor {

  constructor(public source: SourceFilterType) {
    super();
  }

  buildSharedQuery(query: any){
    return query.setSource(this.source)
  }
}
