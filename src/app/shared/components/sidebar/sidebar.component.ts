// https://www.w3schools.com/howto/howto_js_collapse_sidepanel.asp

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'itcorpo-sidebar',
    template: `
<div id="mySidebar" class="sidebar" [ngClass]="{'collapsed': collapsed}">
  <a class="closebtn" (click)="onCloseClick()">×</a>
  <ng-content></ng-content>
</div>
  `,
    styleUrls: ['./sidebar.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SidebarComponent {
  @Input()
  collapsed: boolean = true

  @Output()
  collapsedChange = new EventEmitter<boolean>()

  onCloseClick(){
    this.collapsed = true
    this.collapsedChange.emit(true)
  }
}
