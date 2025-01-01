import { Component, Input } from '@angular/core';

import { Employee } from 'src/app/api/data-contracts';
import { apiURL } from 'src/app/api/config';

@Component({
  selector: 'itcorpo-employee-image',
  template: `<itcorpo-image [src]="url()"></itcorpo-image>`
})
export class EmployeeImageComponent {
  @Input()
  employee!: Employee

  url(){
    return `${apiURL}/images/avatars/${this.employee.imgURL}`
  }
}
