import { Component, OnInit, ChangeDetectionStrategy, inject, Optional, Injector, assertInInjectionContext, runInInjectionContext } from '@angular/core';

import { finalize, Observable } from 'rxjs';

import { Employee } from 'src/app/api/data-contracts';

import { EmployeesService, EmployeeSvc } from 'src/app/api/employees.service';

class DoesntExist {}

/**
 *
 * @param someParams
 * @param injector - pass it mainly when outside of the injection context
 */
function injectNotifications(someParams: any, injector?: Injector){

  if (!injector) {
    injector = inject(Injector);
    assertInInjectionContext(injectNotifications); // TODO
  }

  runInInjectionContext(injector, () => {
    //...
  });

  // inject the service
  // provide CONVENIENT methods to use for the component
}

export function injectMyServices() {
  return {
    employeeSvc: inject(EmployeesService)
  }
}

@Component({
    selector: 'itcorpo-employee-listing',
    templateUrl: './employee-listing.component.html',
    styleUrls: ['./employee-listing.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    providers: []
})
export class EmployeeListingComponent implements OnInit {

  // doesntExist = inject(DoesntExist);

  // constructor(
  //   @Optional() private employeeSvc: EmployeesService,
  // ) { }
  // #employeeSvc = inject(EmployeeSvc);
  #employeeSvc = inject(EmployeesService);
  // private employeeSvc = inject(EmployeesService, { optional: true });
  private employeeSvc = injectMyServices().employeeSvc;

  employees$!: Observable<Employee[]> // ! -
  // ! removes null/undefined from the type - "as ..."

  sidebarCollapsed: boolean = true

  cities = {
    "Wilno": "Wilno",
    "Lwów": "Lwów",
  }

  injector = inject(Injector);

  clickHandler(){
    injectMyServices()
  }

  ngOnInit() {
    this.employees$ = this.employeeSvc.getAllEmployees().pipe(
      finalize(() => {
        // debugger;
        /* injectNotification().showNotification() */
      })
    )

    // this.employees$ = this.employeeSvc.getAllEmployees({ nationality: "PL" })
    // this.employees$ = this.employeeSvc.getAllEmployees({ office_like: "Poland" })
    // this.employees$ = this.employeeSvc.getAllEmployees({ office_like: "Łódź" })
  }

  onToggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed
  }

  trackByEmployeeId(index: number, employee: Employee): number {
    return employee.id;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }
}


// EmployeeListingFacade.svc.ts
// provide it adequatelly in the component
// decide what to put there
