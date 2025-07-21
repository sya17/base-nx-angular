import { Component, Input, Output, EventEmitter, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';
import { Button } from '../button/button';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'number' | 'date' | 'custom';
}

export interface TableConfig {
  selectable?: boolean;
  pagination?: boolean;
  sorting?: boolean;
  filtering?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
}

@Component({
  selector: 'lib-table',
  imports: [CommonModule, Icon, Button],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() config: TableConfig = {
    selectable: false,
    pagination: true,
    sorting: true,
    filtering: false,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50, 100]
  };
  @Input() loading = false;
  @Input() emptyMessage = 'No data available';

  @Output() rowClick = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() sortChange = new EventEmitter<{column: string, direction: 'asc' | 'desc'}>();
  @Output() pageChange = new EventEmitter<{page: number, pageSize: number}>();

  @ContentChild('actions') actionsTemplate?: TemplateRef<any>;
  @ContentChild('customCell') customCellTemplate?: TemplateRef<any>;

  // Internal state
  selectedRows: any[] = [];
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  pageSize = 10;

  ngOnInit() {
    this.pageSize = this.config.pageSize || 10;
  }

  get paginatedData() {
    if (!this.config.pagination) {
      return this.sortedData;
    }
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.sortedData.slice(startIndex, endIndex);
  }

  get sortedData() {
    if (!this.config.sorting || !this.sortColumn) {
      return this.data;
    }

    return [...this.data].sort((a, b) => {
      const aValue = this.getNestedValue(a, this.sortColumn);
      const bValue = this.getNestedValue(b, this.sortColumn);
      
      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      if (aValue < bValue) comparison = -1;
      
      return this.sortDirection === 'desc' ? -comparison : comparison;
    });
  }

  get totalPages() {
    return Math.ceil(this.data.length / this.pageSize);
  }

  get allSelected() {
    return this.selectedRows.length === this.paginatedData.length && this.paginatedData.length > 0;
  }

  get someSelected() {
    return this.selectedRows.length > 0 && this.selectedRows.length < this.paginatedData.length;
  }

  protected getNestedValue(obj: any, path: string) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  protected Math = Math;

  onSort(column: TableColumn) {
    if (!column.sortable || !this.config.sorting) return;
    
    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }
    
    this.sortChange.emit({
      column: this.sortColumn,
      direction: this.sortDirection
    });
  }

  onRowClick(row: any) {
    this.rowClick.emit(row);
  }

  onSelectAll() {
    if (this.allSelected) {
      this.selectedRows = [];
    } else {
      this.selectedRows = [...this.paginatedData];
    }
    this.selectionChange.emit(this.selectedRows);
  }

  onSelectRow(row: any) {
    const index = this.selectedRows.findIndex(r => r === row);
    if (index > -1) {
      this.selectedRows.splice(index, 1);
    } else {
      this.selectedRows.push(row);
    }
    this.selectionChange.emit(this.selectedRows);
  }

  isRowSelected(row: any): boolean {
    return this.selectedRows.includes(row);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.pageChange.emit({
      page: this.currentPage,
      pageSize: this.pageSize
    });
  }

  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1; // Reset to first page
    this.pageChange.emit({
      page: this.currentPage,
      pageSize: this.pageSize
    });
  }

  getSortIcon(column: TableColumn): string {
    if (!column.sortable || this.sortColumn !== column.key) {
      return 'unfold_more';
    }
    return this.sortDirection === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

  getCellAlignment(column: TableColumn): string {
    return column.align || 'left';
  }

  formatCellValue(value: any, column: TableColumn): string {
    if (value == null) return '';
    
    switch (column.type) {
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value;
      default:
        return value.toString();
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}