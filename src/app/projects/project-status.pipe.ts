import { Pipe, PipeTransform } from '@angular/core';
import { ProjectStatus } from '../api/data-contracts';

@Pipe({
  name: 'projectStatus'
})
export class ProjectStatusPipe implements PipeTransform {
  transform(value: ProjectStatus): string {
    // Replace underscores with spaces and convert to Title Case
    return value
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  }
}
