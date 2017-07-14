import { Accessor } from './Accessor';


export interface HitsOptions{
  scrollTo: string | boolean
}

export class HitsAccessor extends Accessor {

  constructor(public options: HitsOptions){
    super();
  }

  setResults(results: any[]) {
    super.setResults(results);
    this.scrollIfNeeded();
  }

  scrollIfNeeded(){
    if (this.searchManager.hasHitsChanged() && this.options.scrollTo) {
      const el = document.querySelector(this.getScrollSelector());
      if (el) {
        el.scrollTop = 0;
      }
    }
  }

  getScrollSelector(){
    return (this.options.scrollTo == true)
      ? 'body'
      : this.options.scrollTo.toString();
  }
}
