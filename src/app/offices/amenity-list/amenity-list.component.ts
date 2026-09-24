import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'itcorpo-amenity-list',
    templateUrl: './amenity-list.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AmenityListComponent {
  // server returns amenity codes as string[]; component accepts string[] only
  @Input() amenities!: string[];

  displayName(code?: string) {
    if (!code) return '';
    return code
      .toLowerCase()
      .replace(/[_-]/g, ' ')
      .replace(/\b\w/g, m => m.toUpperCase());
  }
}
