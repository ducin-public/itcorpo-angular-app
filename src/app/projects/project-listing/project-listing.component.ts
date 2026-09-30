import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Router } from '@angular/router';

import { apiURL } from 'src/app/api/config';
import { Project } from 'src/app/api/data-contracts';

@Component({
    selector: 'itcorpo-project-listing',
    templateUrl: './project-listing.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ProjectListingComponent {
  page = signal(1)
  pageSize = signal(20)

  projects = httpResource<Project[]>(() => ({
    url: `${apiURL}/projects`,
    params: {
      page: String(this.page()),
      pageSize: String(this.pageSize()),
    },
  }))

  constructor(
    private router: Router
  ) { }

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
