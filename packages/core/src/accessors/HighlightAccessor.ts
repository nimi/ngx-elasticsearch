import { Accessor } from './Accessor';
import { mapValues, zipObject, constant } from 'lodash';
import { ImmutableQuery } from '../query/ImmutableQuery';


export class HighlightAccessor extends Accessor {
  highlightFields: any;

  constructor(public fields: Array<string>) {
    super();
    this.highlightFields = this.computeHighlightedFields(fields);
  }

  computeHighlightedFields(fields: any) {
    return {
      fields: mapValues(
        zipObject(fields),
        constant({})
      )
    };
  }
  buildOwnQuery(query: ImmutableQuery) {
    return query.setHighlight(this.highlightFields);
  }
}
