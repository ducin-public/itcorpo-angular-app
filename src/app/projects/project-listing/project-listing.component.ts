import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/api/projects.service';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Project } from 'src/app/api/data-contracts';

@Component({
  selector: 'itcorpo-project-listing',
  templateUrl: './project-listing.component.html'
})
export class ProjectListingComponent implements OnInit {
  projects$!: Observable<Project[]>

  constructor(
    private projectSvc: ProjectsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.projects$ = this.projectSvc.getAllProjects()
  }

  getStatusColor(status: string): string {
    const statusColors: { [key: string]: string } = {
      'planning': 'bg-yellow-100 text-yellow-800',
      'active': 'bg-green-100 text-green-800',
      'completed': 'bg-blue-100 text-blue-800',
      'on-hold': 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  }

  onView(project: Project) {
    this.router.navigate(['/projects', project.id]);
  }

  onEdit(project: Project) {
    console.log('Edit project:', project.id);
    // TODO: Implement navigation
  }

  onDelete(project: Project) {
    console.log('Delete project:', project.id);
    // TODO: Implement delete functionality
  }
}
