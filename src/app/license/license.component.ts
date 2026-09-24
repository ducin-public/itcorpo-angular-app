import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { LicenseService } from '../api/license.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'itcorpo-license',
    template: `<h2>license</h2><pre>{{ content$ | async }}</pre>`,
    styleUrls: ['./license.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LicenseComponent {
  content$!: Observable<string | null>;

  constructor(
    private licenseSvc: LicenseService
  ){}

  ngOnInit(): void {
    this.content$ = this.licenseSvc.get()
  }
}
