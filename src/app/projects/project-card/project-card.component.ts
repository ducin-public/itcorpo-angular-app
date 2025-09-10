import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/api/data-contracts';
import { projectImageUrl } from './project-image';

@Component({
  selector: 'itcorpo-project-card',
  templateUrl: './project-card.component.html'
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Output() view = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  constructor(private router: Router) {}

  url(){
    const p = this.project;
    if (!p) throw new Error("No project");
    return projectImageUrl(p.id)
  }

  getStatusColor(status: string): string {
    const statusColors: { [key: string]: string } = {
      'planning': 'bg-yellow-100 text-yellow-800',
      'active': 'bg-green-100 text-green-800',
      'completed': 'bg-blue-100 text-blue-800',
      'on-hold': 'bg-red-100 text-red-800'
    };
    return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  }

  onView() {
    this.router.navigate(['/projects', this.project.id]);
  }
}
