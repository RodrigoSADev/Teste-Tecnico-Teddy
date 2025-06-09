import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  currentPage = input<number>(1);
  totalItems = input<number>(0);
  itemsPerPage = input<number>(8);
  pageChange = output<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems() / this.itemsPerPage());
  }

  getPages(): number[] {
    const pages: number[] = [];
    const total = this.totalPages;
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
