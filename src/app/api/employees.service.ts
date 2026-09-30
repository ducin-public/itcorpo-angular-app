import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiURL, MAX_PAGE_SIZE } from './config';
import { applyQueryString } from './queryString';

import { Employee, Nationality } from './data-contracts';
import { concat, concatMap, map, merge, mergeMap, Observable, range, retry, scan, switchMap, tap, timer } from 'rxjs';

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

  getAllEmployees__only1page(criteria: EmployeeCriteria = {}) {
    return this.getPage(criteria)
  }

  getAllEmployees__sequential(criteria: EmployeeCriteria = {}) {
    return concat(
      this.getPage(criteria, 1),
      this.getPage(criteria, 2),
      this.getPage(criteria, 3),
    )
  }

  getAllEmployees__parallel(criteria: EmployeeCriteria = {}) {
    return merge(
      this.getPage(criteria, 1),
      this.getPage(criteria, 2),
      this.getPage(criteria, 3),
    )
  }
  // idxTEMP = NaN;

  getAllEmployees(criteria: EmployeeCriteria = {}) {
    // this.getCount() -> 511
    // MAX_PAGE_SIZE (50)
    // Math.ceil(511 / 50) -> 11
    // 11 -> 1...2...3...4..........11
    return this.getCount().pipe( // 511
      map( allItemsCount => Math.ceil(allItemsCount / MAX_PAGE_SIZE)), // 11
      switchMap(pages => range(1, pages)), // only 1 upstream notification => doesn't matter which one we choose
      // mergeMap(pages => range(1, 11)),
      // concatMap(pages => range(1, 11)),
      mergeMap(idx => this.getPage(criteria, idx).pipe(
        map(page => ({ idx, page })),
        retry({
          count: 3,
          delay: (_error, retryCount) => timer(2 ** (retryCount - 1) * 1000), // 1s, 2s, 4s
        }),
      )),

      // DONT DO IT AT HOME START
      // mergeMap(idx => {
      //   idxTEMP = idx
      //   return this.getPage(criteria, idx)
      // }),
      // map(page => ({ idx: idxTEMP, page })),
      // DONT DO IT AT HOME END
      scan((allPages, { idx, page }) => {
        allPages[idx] = page;
        return allPages;
      }, [] as Employee[][]),
      // [ empty x10, { idx:11, page: 50[] }]
      map(nestedArray => nestedArray.flat())
      // 50[], 100[], 150[], 200[], 250[], 300[], 350[], 400[], 450[], 500[]
      // tap(console.log),
      // tap({
      //   next: console.log,
      //   error: console.log,
      //   complete: console.log,
      // })
    )
  }
}

// [ empty ] -> []
// [ empty, 50[], empty ] -> 50[]
// [ empty, 50[], empty, 50[], empty ] -> 100[]

// already a singleton:
// export const instance = new EmployeesService(http);
