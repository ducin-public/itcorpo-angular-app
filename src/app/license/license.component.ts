import { Component, Input } from '@angular/core';

import { LicenseService } from '../api/license.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'itcorpo-license',
    template: `<h2>license</h2><pre>{{ content$ | async }}</pre>`,
    styleUrls: ['./license.component.css'],
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
