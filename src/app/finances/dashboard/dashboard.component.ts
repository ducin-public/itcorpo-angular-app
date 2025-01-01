import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { EmployeesService } from 'src/app/api/employees.service';
import { BenefitsService } from 'src/app/api/benefits.service';
import { OfficesService } from 'src/app/api/offices.service';
import { ProjectsService } from 'src/app/api/projects.service';
import { ExpensesService } from 'src/app/api/expenses.service';

import { Observable, of } from 'rxjs';

import { Expense } from 'src/app/api/data-contracts';

@Component({
  selector: 'itcorpo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  monthlyCost$!: Observable<number>
  yearlyCost$!: Observable<number>

  expenses$!: Observable<Expense[]>

  constructor(
    private officesSvc: OfficesService,
    private projectsSvc: ProjectsService,
    private employeesSvc: EmployeesService,
    private benefitsSvc: BenefitsService,
    private expensesSvc: ExpensesService,
    private currencyPipe: CurrencyPipe,
  ) { }

  ngOnInit() {
    this.expenses$ = this.expensesSvc.getExpenses()

    this.monthlyCost$ = of(1234567890)

    this.yearlyCost$ = of(9876543210)
  }


  monthly = 1234567890
  yearly = 9876543210

  table = {
    headers: ['Cost Category', 'Total Monthly Expenses', 'Total Yearly Expenses'],
    rows: [
      [
        'Office Rentals',
        this.currencyPipe.transform(this.monthly, "EUR")!,
        this.currencyPipe.transform(this.yearly, "EUR")!,
      ],
      [
        'Employee Salaries',
        this.currencyPipe.transform(this.monthly, "EUR")!,
        this.currencyPipe.transform(this.yearly, "EUR")!,
      ],
      [
        'Employee Benefits',
        this.currencyPipe.transform(this.monthly, "EUR")!,
        this.currencyPipe.transform(this.yearly, "EUR")!,
      ],
      [
        'Total Expenses',
        this.currencyPipe.transform(this.monthly, "EUR")!,
        this.currencyPipe.transform(this.yearly, "EUR")!,
      ],
    ]
  }

}
