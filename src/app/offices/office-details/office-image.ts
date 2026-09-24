import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Office } from 'src/app/api/data-contracts';
import { apiURL } from 'src/app/api/config';

@Component({
    selector: 'itcorpo-office-image',
    template: `<itcorpo-image [src]="url()"></itcorpo-image>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class OfficeImageComponent {
  @Input()
  office!: Office

  url(){
    return `${apiURL}/images/offices/${this.office.imgURL}`
  }
}
