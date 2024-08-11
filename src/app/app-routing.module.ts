import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicenseComponent } from './license/license.component';
import { HomeComponent } from './home/home.component';

import { OfficesRoutingModule } from './offices/offices-routing.module';
import { EmployeesRoutingModule } from './employees/employees-routing.module';
import { ProjectsRoutingModule } from './projects/projects-routing.module';
import { FinancesRoutingModule } from './finances/finances-routing.module';
import { BenefitsRoutingModule } from './benefits/benefits-routing.module';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'license',
    component: LicenseComponent,
  },
  {
    path: 'offices',
    loadChildren: () => OfficesRoutingModule
  },
  {
    path: 'projects',
    loadChildren: () => ProjectsRoutingModule
  },
  {
    path: 'employees',
    loadChildren: () => EmployeesRoutingModule
  },
  {
    path: 'benefits',
    loadChildren: () => BenefitsRoutingModule
  },
  {
    path: 'finances',
    loadChildren: () => FinancesRoutingModule
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
