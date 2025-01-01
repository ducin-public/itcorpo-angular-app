import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ProjectListingComponent } from './project-listing/project-listing.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

@NgModule({
  declarations: [
    ProjectListingComponent,
    ProjectCardComponent,
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class ProjectsModule { }
