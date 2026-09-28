import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiURL } from './config';
import { applyQueryString } from './queryString';

import { Employee, Nationality } from './data-contracts';
import { Observable } from 'rxjs';

export type EmployeeCriteria = {
  nationality?: Nationality
  office_like?: string // for either cities or countries
}

export interface EmployeeSvc {
  getAllEmployees(criteria: EmployeeCriteria): Observable<Employee[]>
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService implements EmployeeSvc {

  constructor(
    private http: HttpClient
  ) { }

  deleteEmployee(id: Employee['id']) {
    return this.http.delete(`${apiURL}/employees/${id}`)
  }

  getEmployee(id: Employee['id']) {
    return this.http.get<Employee>(`${apiURL}/employees/${id}`)
  }

  getPage(criteria: EmployeeCriteria = {}, page: number = 1, pageSize = 50) {
    const query = applyQueryString({
      ...criteria,
      pageSize,
      page
    })
    return this.http.get<Employee[]>(`${apiURL}/employees${query}`)
  }

  getCount(criteria: EmployeeCriteria = {}) {
    const query = applyQueryString(criteria)
    return this.http.get<number>(`${apiURL}/employees/count${query}`)
  }

  getAllEmployees(criteria: EmployeeCriteria = {}) {
    return this.getPage(criteria)
  }
}

// already a singleton:
// export const instance = new EmployeesService(http);
