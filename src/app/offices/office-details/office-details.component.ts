import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';

import { Office } from 'src/app/api/data-contracts';
import { OfficesService } from 'src/app/api/offices.service';
import { officeImageURL } from '../officeImageURL';

@Component({
  selector: 'itcorpo-office-details',
  templateUrl: './office-details.component.html'
})
export class OfficeDetailsComponent implements OnInit {
  office$!: Observable<Office | undefined>;

  getImageURL = officeImageURL;

  constructor(
    private route: ActivatedRoute,
    private officeSvc: OfficesService
  ) {}

  ngOnInit() {
    this.office$ = this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => this.officeSvc.getAllOffices().pipe(
        map(offices => offices.find(o => o.city.toLowerCase() === id))
      ))
    );
  }
}
