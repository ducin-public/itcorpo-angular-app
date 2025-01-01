import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiURL } from './config';
import { Expense } from './data-contracts';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(
    private http: HttpClient
  ) { }

  getExpenses() {
    return this.http.get<Expense[]>(`${apiURL}/finances/expenses`)
  }
}
