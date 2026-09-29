import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Employee } from 'src/app/api/data-contracts';
// import { EmployeeSalaryComponent } from '../employee-salary/employee-salary.component';
import { EmployeeImageComponent } from '../employee-image';
// import { EmployeesModule } from '../employees.module.ts___';

@Component({
    selector: 'itcorpo-employee-details',
    templateUrl: './employee-details.component.html',
    styleUrls: ['./employee-details.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true,
    imports: [
      CommonModule,
      // DatePipe,
      RouterModule,
      // EmployeesModule
      // CurrencyPipe,
      EmployeeImageComponent
    ]
})
export class EmployeeDetailsComponent {
  @Input()
  employee!: Employee
}
