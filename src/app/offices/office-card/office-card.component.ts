import { Component, Input, Output, EventEmitter } from '@angular/core';

import { officeImageURL } from '../officeImageURL';
import { Office, OfficeAmenity } from 'src/app/api/data-contracts';

@Component({
  selector: 'itcorpo-office-card',
  templateUrl: './office-card.component.html'
})
export class OfficeCardComponent {
  @Input() office!: Office;
  @Input() officeAmenities!: OfficeAmenity[];
  @Output() view = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  getImageURL = officeImageURL;
}
