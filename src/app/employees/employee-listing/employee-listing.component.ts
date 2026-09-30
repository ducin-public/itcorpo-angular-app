import { Component, OnInit, ChangeDetectionStrategy, inject, Optional, Injector, assertInInjectionContext, runInInjectionContext, DestroyRef, Signal } from '@angular/core';

import { finalize, Observable, share, shareReplay, tap } from 'rxjs';

import { Employee } from 'src/app/api/data-contracts';

import { EmployeesService, EmployeeSvc } from 'src/app/api/employees.service';
import { SharedModule } from '../../shared/shared.module';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { FlagPipe } from '../flag.pipe';
import { EmployeeSalaryComponent } from '../employee-salary/employee-salary.component';
import { NotificationsService } from 'src/app/shared/components/fadebox/fadebox.component';
import { toSignal } from '@angular/core/rxjs-interop';

class DoesntExist {}

/**
 *
 * @param someParams
 * @param injector - pass it mainly when outside of the injection context
 */
function injectNotifications(debugMessage: string, injector?: Injector){
  if (!injector) {
    ngDevMode && assertInInjectionContext(injectNotifications);
    injector = inject(Injector);
  }

  runInInjectionContext(injector, () => {
    console.log(`runInInjectionContext ${debugMessage}`);

    // subscribeToSomething()
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => {
      console.log('NOTIFICATIONS CLEANUP')
    });

    return inject(NotificationsService);
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
      useClass: EmployeesService,
      // useFactory: () => {
      //   console.log('mamjo jumbo');
      //   return EmployeesService()
      // }
      provide: EmployeesService
    }],
    imports: [
      SharedModule, RouterLinkActive, RouterLink, FlagPipe,
      EmployeeSalaryComponent
    ]
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

  notifications = injectNotifications('PROPERTY INITIALIZER');

  sidebarCollapsed: boolean = true

  cities = {
    "Wilno": "Wilno",
    "Lwów": "Lwów",
  }

  injector = inject(Injector);

  // DestroyRef.onDestroy(cleanupLogic)
  ngOnDestroy(){
    // cleanup logic
  }

  clickHandler(){
    injectMyServices()
  }


  // IMMEDIATE subscription
  employees = toSignal(this.employeeSvc.getAllEmployees().pipe(
    shareReplay(1)
  )) // ! -

  // employees$!: Observable<Employee[]> // ! -
  // ! removes null/undefined from the type - "as ..."

  ngOnInit() {
    // lazy COLD streams
    // COLD vs HOT (64 different combinations)
    // .pipe(
    //   // finalize(() => {
    //   tap(() => {
    //     /* injectNotification().showNotification() */
    //     // debugger;
    //     injectNotifications('STREAM', this.injector);
    //   })
    // )

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
