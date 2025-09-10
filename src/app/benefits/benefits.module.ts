import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { BenefitListingComponent } from './benefit-listing/benefit-listing.component';
import { BenefitDetailsComponent } from './benefit-details/benefit-details.component';
import { BenefitCardComponent } from './benefit-card/benefit-card.component';

@NgModule({
  declarations: [
    BenefitListingComponent,
    BenefitDetailsComponent,
    BenefitCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ]
})
export class BenefitsModule { }
