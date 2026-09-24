import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Employee } from 'src/app/api/data-contracts';
import { apiURL } from 'src/app/api/config';

@Component({
    selector: 'itcorpo-employee-image',
    template: `<itcorpo-image [src]="url()"></itcorpo-image>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class EmployeeImageComponent {
  @Input()
  employee!: Employee

  url(){
    return `${apiURL}/images/avatars/${this.employee.imgURL}`
  }
}
