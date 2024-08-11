import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { OfficesRoutingModule } from './offices-routing.module';

import { OfficeListingComponent } from './office-listing/office-listing.component';
import { OfficeDetailsComponent } from './office-details/office-details.component';
import { OfficeImageComponent } from './office-details/office-image';

@NgModule({
  declarations: [
    OfficeListingComponent,
    OfficeDetailsComponent,
    OfficeImageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports :[
    OfficeListingComponent,
  ]
})
export class OfficesModule { }
