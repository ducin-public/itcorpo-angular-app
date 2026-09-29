import { BrowserModule } from "@angular/platform-browser";
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr
} from "@angular/common/http";
import { NgModule } from "@angular/core";

import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { LicenseComponent } from "./license/license.component";
import { HomeComponent } from "./home/home.component";

import { OfficesModule } from "./offices/offices.module";
// import { EmployeesModule } from "./employees/employees.module.ts___";
import { ProjectsModule } from "./projects/projects.module";
import { FinancesModule } from "./finances/finances.module";
import { BenefitsModule } from "./benefits/benefits.module";
import { NavigationComponent } from "./navigation/navigation.component";
import { NavItemComponent } from "./navigation/nav-item.component";
// import { EmployeeSalaryComponent } from './employees/employee-salary/employee-salary.component';

@NgModule({
  declarations: [
    AppComponent,
    LicenseComponent,
    HomeComponent,
    NavigationComponent,
    NavItemComponent,
    // EmployeeSalaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    OfficesModule,
    // EmployeesModule,
    ProjectsModule,
    FinancesModule,
    BenefitsModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    provideHttpClient(withXhr(), withInterceptorsFromDi())
  ],
})
export class AppModule {}
