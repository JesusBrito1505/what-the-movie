import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationService } from '../../services/pagination/pagination.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})

export class PaginationComponent {
  @Input() currentPage: number =  1;
  @Input() totalResults: number = 0;
  @Output() pageChanged = new EventEmitter<number>();

  totalPages: number = 1;
  itemsPerPage: number = 10;

  constructor(private paginationService: PaginationService){}
  
  ngOnChanges(){
    this.totalPages = this.paginationService.calculateTotalPages(this.totalResults, this.itemsPerPage);
  }

  previousPage(){
    const prev = this.paginationService.getPreviousPage(this.currentPage);
    this.pageChanged.emit(prev)
  }

  nextPage(){
    const next = this.paginationService.getNextPage(this.currentPage, this.totalPages);
    this.pageChanged.emit(next);
  }

}
