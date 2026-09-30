import { Component, ChangeDetectionStrategy } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { OfficesService } from 'src/app/api/offices.service';
import { Office } from 'src/app/api/data-contracts';

@Component({
    selector: 'itcorpo-office-listing',
    templateUrl: './office-listing.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class OfficeListingComponent {
  officesResource = rxResource({
    stream: () => this.officeSvc.getAllOffices(),
  });

  constructor(
    private officeSvc: OfficesService,
    private router: Router
  ) { }

  onView(office: Office) {
    this.router.navigate(['/offices', office.city.toLowerCase()]);
  }

  onEdit(office: Office) {
    this.router.navigate(['/offices', office.city.toLowerCase(), 'edit']);
  }

  addNewOffice() {
    this.router.navigate(['/offices/new']);
  }
}
