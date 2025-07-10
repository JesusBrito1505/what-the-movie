import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PaginationService {

  calculateTotalPages(totalItems:number, itemsPerPage: number): number{
    return Math.ceil(totalItems/itemsPerPage);
  }

  isValidPage(page: number, totalPages:number): boolean {
    return page>=1 && page <= totalPages;
  }

  getPreviousPage(currentPage: number) : number{
    return currentPage > 1 ? currentPage - 1 : 1;
  }

  getNextPage(currentPage: number, totalPages: number): number{
    return currentPage < totalPages ? currentPage + 1 : totalPages;
  }
  

}
