import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Employee } from 'src/app/api/data-contracts';
import { apiURL } from 'src/app/api/config';
import { SharedModule } from '../shared/shared.module';

@Component({
    selector: 'itcorpo-employee-image',
    template: `<itcorpo-image [src]="url()"></itcorpo-image>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SharedModule]
})
export class EmployeeImageComponent {
  @Input()
  employee!: Employee

  url(){
    return `${apiURL}/images/avatars/${this.employee.imgURL}`
  }
}
