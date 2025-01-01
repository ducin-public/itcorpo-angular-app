import { Component, Input } from '@angular/core';

@Component({
  selector: 'itcorpo-nav-item',
  template: `
    <a
      [routerLink]="to"
      routerLinkActive="text-indigo-600"
      class="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
    >
      <span [innerHTML]="icon"></span>
      <span class="font-medium">{{text}}</span>
    </a>
  `
})
export class NavItemComponent {
  @Input() icon!: string;
  @Input() text!: string;
  @Input() to!: string;
}
