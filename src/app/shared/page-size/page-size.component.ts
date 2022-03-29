import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-size',
  templateUrl: './page-size.component.html',
  styleUrls: ['./page-size.component.scss'],
})
export class PageSizeComponent {
  
  @Input() pageSize!: number;
  @Output() pageSizeChanged: EventEmitter<number> = new EventEmitter<number>();
  // selectOptions = [1, 2, 3]
  selectOptions = [3, 6, 9]
  // selectOptions = [6, 9, 12]

  constructor() {}

  changePageSize(event: any): void {
    this.pageSizeChanged.emit(event.target.value);
  }
}
