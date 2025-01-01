import { Component, Input } from '@angular/core';
import { OfficeAmenity } from 'src/app/api/data-contracts';

@Component({
  selector: 'itcorpo-amenity-list',
  templateUrl: './amenity-list.component.html'
})
export class AmenityListComponent {
  @Input() amenities!: OfficeAmenity[];
}
