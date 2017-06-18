import { PaginationUtils } from './pagination-utils';

export class Paginator {
  
  static full(currentPage, totalPages, translate, pageScope = 3) {
    const builder = PaginationUtils.build({
      currentPage, totalPages, translate
    });
    builder.previous();
    
    // First
    if (currentPage > pageScope + 1) { builder.page(1); }
    if (currentPage > pageScope + 2) { builder.ellipsis(); }
    
    // Pages
    builder.range(currentPage - pageScope, currentPage - 1);
    builder.page(currentPage, {active: true});
    builder.range(currentPage+1, currentPage + pageScope);
    
    // Last ellipsis
    if (currentPage < totalPages - pageScope) { builder.ellipsis(); }
    
    builder.next();
    return builder.pages;
  }
  
  static relativePages(currentPage, totalPages, translate, pageScope = 3){
    const builder = PaginationUtils.build({
      currentPage, totalPages, translate
    });
    
    builder.range(currentPage - pageScope, currentPage - 1);
    builder.page(currentPage, {active: true});
    builder.range(currentPage+1, currentPage + pageScope);
    
    return builder.pages;
  }
  
  static previousNext(currentPage, totalPages, translate){
    const builder = PaginationUtils.build({
      currentPage, totalPages, translate
    });
    
    builder.previous();
    builder.next();
    
    return builder.pages;
  }
  
  static build({
    showNumbers = true,
    showPrevious = true, 
    showNext = true, 
    showEllipsis = true, 
    showFirst = true, 
    showLast = false
  }) {
    return (currentPage, totalPages, translate, pageScope=3) => {
      const builder = PaginationUtils.build({ currentPage, totalPages, translate });
      if (showPrevious) { builder.previous(); }
      if (showNumbers) {
        if (showFirst && currentPage > pageScope + 1) { builder.page(1); }
        if (showEllipsis && currentPage > pageScope + 2) { builder.ellipsis(); }
        
        builder.range(currentPage - pageScope, currentPage-1);
        builder.page(currentPage, {active: true});
        builder.range(currentPage+1, currentPage + pageScope);
        
        const lastEllipsisLimit = showLast ? (totalPages - pageScope - 1) : (totalPages - pageScope);
        if (showEllipsis && currentPage < lastEllipsisLimit) { builder.ellipsis(); }
        if (showLast && (currentPage < totalPages - pageScope)) { builder.page(totalPages); }
      }
      if (showNext) { builder.next(); }
      return builder.pages;
    }
  }

}
