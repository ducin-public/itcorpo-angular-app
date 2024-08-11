import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { EmployeeListingComponent } from './employee-listing/employee-listing.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeDetailsPageComponent } from './employee-details/employee-details-page.component';
import { EmployeeImageComponent } from './employee-image';
import { NameAndTitlePipe } from './name-and-title.pipe';
import { FlagPipe } from './flag.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    EmployeeListingComponent,
    EmployeeDetailsComponent,
    EmployeeDetailsPageComponent,
    EmployeeImageComponent,
    NameAndTitlePipe,
    FlagPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class EmployeesModule { }
