import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'itcorpo-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TableComponent {
  @Input()
  headers!: string[]

  @Input()
  rows!: string[][]
}
