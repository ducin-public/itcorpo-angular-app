import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfficeListingComponent } from './office-listing/office-listing.component';
import { OfficeDetailsComponent } from './office-details/office-details.component';

const routes: Routes = [
  {
    path: '',
    component: OfficeListingComponent
  },
  {
    path: 'new',
    component: OfficeDetailsComponent
  },
  {
    path: ':id',
    component: OfficeDetailsComponent
  },
  {
    path: ':id/edit',
    component: OfficeDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficesRoutingModule { }
