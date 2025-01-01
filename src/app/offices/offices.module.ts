import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { OfficesRoutingModule } from './offices-routing.module';

import { OfficeListingComponent } from './office-listing/office-listing.component';
import { OfficeDetailsComponent } from './office-details/office-details.component';
import { OfficeImageComponent } from './office-details/office-image';
import { OfficeCardComponent } from './office-card/office-card.component';
import { LucideAngularModule, Plus, Eye, Edit, Users, DollarSign } from 'lucide-angular';
import { AmenityListComponent } from './amenity-list/amenity-list.component';

@NgModule({
  declarations: [
    OfficeListingComponent,
    OfficeDetailsComponent,
    OfficeCardComponent,
    OfficeImageComponent,
    AmenityListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LucideAngularModule.pick({ Plus, Eye, Edit, Users, DollarSign })
  ],
  exports :[
    OfficeListingComponent,
  ]
})
export class OfficesModule { }
