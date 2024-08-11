import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpensesListingComponent } from './expenses-listing/expenses-listing.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, ExpensesListingComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class FinancesModule { }
