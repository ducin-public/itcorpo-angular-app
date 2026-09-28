import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

// static import IMMEDIATELY
import { EmployeeListingComponent } from './employee-listing/employee-listing.component';
// dynamic import ON DEMAND
// const dynamicImport = import('./employee-listing/employee-listing.component');

import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeDetailsPageComponent } from './employee-details/employee-details-page.component';
import { EmployeeImageComponent } from './employee-image';
import { FlagPipe } from './flag.pipe';
import { RouterModule } from '@angular/router';

// const blah = [
//   EmployeeListingComponent,
//   EmployeeDetailsComponent,
//   EmployeeDetailsPageComponent,
//   EmployeeImageComponent,
//   FlagPipe,
// ];

@NgModule({
  declarations: [
    EmployeeListingComponent,
    // EmployeeDetailsComponent,
    EmployeeDetailsPageComponent,
    EmployeeImageComponent,
    FlagPipe,
  ],
  imports: [
    EmployeeDetailsComponent, // SCAM
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    EmployeeImageComponent,
  ],
  providers: []
})
export class EmployeesModule { }
