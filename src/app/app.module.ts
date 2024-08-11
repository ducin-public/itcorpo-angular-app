import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';


import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LicenseComponent } from './license/license.component';
import { HomeComponent } from './home/home.component';

import { OfficesModule } from './offices/offices.module';
import { EmployeesModule } from './employees/employees.module';
import { ProjectsModule } from './projects/projects.module';
import { FinancesModule } from './finances/finances.module';
import { BenefitsModule } from './benefits/benefits.module';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    LicenseComponent,
    HomeComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,

    OfficesModule,
    EmployeesModule,
    ProjectsModule,
    FinancesModule,
    BenefitsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
