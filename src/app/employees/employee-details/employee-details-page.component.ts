import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/api/data-contracts';

@Component({
  selector: 'itcorpo-employee-details-page',
  template: `<itcorpo-employee-details [employee]="employee"></itcorpo-employee-details>`
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
