import {ValueState} from "../state"
import {StatefulAccessor} from "./StatefulAccessor"

export class BaseQueryAccessor extends StatefulAccessor<ValueState> {

  constructor(key: any) {
    super(key);
    this.state = new ValueState();
  }

  keepOnlyQueryState() {
    this.setQueryString(this.getQueryString() || '', true)
  }

  setQueryString(queryString: string | number, withReset: boolean = false) {
    if (withReset) {
      this.searchManager.resetState();
    }
    this.state = this.state.setValue(queryString)
  }

  getQueryString() {
    return this.state.getValue();
  }

}

export class NoopQueryAccessor extends BaseQueryAccessor {
  keepOnlyQueryState(){
    console.warn("keepOnlyQueryState called, No Query Accessor exists");
  }

  setQueryString(queryString: any, withReset=false){
    console.warn("setQueryString called, No Query Accessor exists");
  }

  getQueryString(){
    console.warn("getQueryString called, No Query Accessor exists")
    return "";
  }
}

export const noopQueryAccessor = new NoopQueryAccessor(null);
