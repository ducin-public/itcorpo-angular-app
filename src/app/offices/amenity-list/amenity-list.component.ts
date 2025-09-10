import { Component, Input } from '@angular/core';

@Component({
  selector: 'itcorpo-amenity-list',
  templateUrl: './amenity-list.component.html'
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
