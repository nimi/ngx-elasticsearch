import {ValueState} from "../state"
import {StatefulAccessor} from "./StatefulAccessor"
import { ImmutableQuery } from '../query/ImmutableQuery';


export class PaginationAccessor extends StatefulAccessor<ValueState> {
  state: ValueState = new ValueState();

  onStateChange(oldState: any = {}) {
    if(oldState[this.urlKey] == this.state.getValue()) {
      this.state = this.state.clear();
    }
  }

  buildOwnQuery(query: ImmutableQuery) {
    let from = (query.getSize() || 20) * (Number(this.state.getValue()) -1 );
    if(from > 0){
      return query.setFrom(from);
    }
    return query;
  }
}
