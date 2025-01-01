import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfficesService } from 'src/app/api/offices.service';
import { Observable } from 'rxjs';
import { Office } from 'src/app/api/data-contracts';

@Component({
  selector: 'itcorpo-office-listing',
  templateUrl: './office-listing.component.html'
})
export class OfficeListingComponent implements OnInit {
  offices$!: Observable<Office[]>;

  constructor(
    private officeSvc: OfficesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.offices$ = this.officeSvc.getAllOffices();
  }

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
