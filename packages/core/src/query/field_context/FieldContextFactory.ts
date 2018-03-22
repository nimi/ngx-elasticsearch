import { NestedFieldContext } from './NestedFieldContext';
import { ChildrenFieldContext } from './ChildrenFieldContext';
import { EmbeddedFieldContext } from './EmbeddedFieldContext';

export const FieldContextFactory = (fieldOptions: any) => {
  switch (fieldOptions.type){
    case 'nested':
      return new NestedFieldContext(fieldOptions);
    case 'children':
      return new ChildrenFieldContext(fieldOptions);
    default: // case: 'embedded'
      return new EmbeddedFieldContext(fieldOptions);
  }
};
