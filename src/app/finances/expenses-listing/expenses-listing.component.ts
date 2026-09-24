import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Expense } from 'src/app/api/data-contracts';

@Component({
    selector: 'itcorpo-expenses-listing',
    templateUrl: './expenses-listing.component.html',
    styleUrls: ['./expenses-listing.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ExpensesListingComponent {
  @Input()
  expenses!: Expense[]
}
