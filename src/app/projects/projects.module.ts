import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ProjectListingComponent } from './project-listing/project-listing.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectStatusPipe } from './project-status.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProjectListingComponent,
    ProjectCardComponent,
    ProjectDetailsComponent,
    ProjectStatusPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class ProjectsModule { }
