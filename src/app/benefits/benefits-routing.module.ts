import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BenefitListingComponent } from './benefit-listing/benefit-listing.component';
import { BenefitDetailsComponent } from './benefit-details/benefit-details.component';

const routes: Routes = [
  {
    path: '',
    component: BenefitListingComponent
  },
  {
    path: ':id',
    component: BenefitDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BenefitsRoutingModule { }
