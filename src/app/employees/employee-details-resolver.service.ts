import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { EmployeesService } from '../api/employees.service';
import { Employee } from 'src/app/api/dto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsResolverService  {

  constructor(
    private employeeSvc: EmployeesService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee> {
    let id = parseInt(route.paramMap.get('id'))
    return this.employeeSvc.getEmployee(id)
  }
}
