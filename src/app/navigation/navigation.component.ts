import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { GeoService } from '../api/geo.service';
import { Nationality } from '../api/dto';

@Component({
  selector: 'itcorpo-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  geoData$!: Observable<{ [k: string]: string }>

  constructor(
    private geoSvc: GeoService,
  ){}

  ngOnInit(): void {
    this.geoData$ = this.geoSvc.getGeo()
  }
}
