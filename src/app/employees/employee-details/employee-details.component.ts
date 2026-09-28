import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Employee } from 'src/app/api/data-contracts';
import { EmployeesModule } from '../employees.module';

@Component({
    selector: 'itcorpo-employee-details',
    templateUrl: './employee-details.component.html',
    styleUrls: ['./employee-details.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
      EmployeesModule
      // CurrencyPipe,
    ]
})
export class EmployeeDetailsComponent {
  @Input()
  employee!: Employee
}
