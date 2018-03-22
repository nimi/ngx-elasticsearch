export class PaginationUtils {

  static build(options: any) {
    return new PaginationUtils(options);
  }

  public currentPage: number
  public totalPages: number
  public translate: Function
  public pages: Array<any> = [];
  public lastPage: number = 0;
  
  constructor({currentPage, totalPages, translate}){
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.translate = translate;
  }
  
  push(item: any) {
    this.pages.push(item);
  }
  
  previous(options = {}) {
    this.push({
      key: 'previous',
      label: this.translate('Previous'),
      page: this.currentPage > 1 ? (this.currentPage - 1) : undefined,
      disabled: this.currentPage === 1,
      ...options
    });
  }
  
  next(options = {}) {
    this.push({
      key: 'next',
      label: this.translate('Next'),
      page: this.currentPage < this.totalPages - 1 ? (this.currentPage + 1) : undefined,
      disabled: this.currentPage === this.totalPages,
      ...options
    });
  }
  
  page(pageNumber: number, options = {}) {
    if (pageNumber > 0 && pageNumber <= this.totalPages){
      this.push({
        key: pageNumber,
        label: '' + pageNumber,
        page: pageNumber,
        active: pageNumber == this.currentPage,
        ...options
      });
    }
  }
  
  range(minPage: number, maxPage: number, options = {}) {
    const min = Math.max(1, minPage);
    const max = Math.min(maxPage, this.totalPages);
    for(var i=min; i<= max; i++){
      this.page(i, options);
    }
  }
  
  ellipsis(options = {}){
    this.push({ 
      key: 'ellipsis-' + this.pages.length, 
      label: '...', 
      disabled: true,
      ...options
    });
  }
}
