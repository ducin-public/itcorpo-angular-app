import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiURL } from './config';
import { Geo } from 'src/app/api/data-contracts';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor(
    private http: HttpClient
  ) { }

  getGeo() {
    return this.http.get<Geo>(`${apiURL}/geo?`)
  }
}
