import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/api/data-contracts';
import { EmployeeDetailsComponent } from './employee-details.component';

@Component({
    selector: 'itcorpo-employee-details-page',
    template: `<itcorpo-employee-details [employee]="employee"></itcorpo-employee-details>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [EmployeeDetailsComponent]
})
export class EmployeeDetailsPageComponent {
  employee!: Employee

  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.employee = this.route.snapshot.data.employee
  }
}
