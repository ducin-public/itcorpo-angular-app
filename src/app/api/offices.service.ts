import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiURL } from './config';
import { Office } from './data-contracts';

@Injectable({
  providedIn: 'root'
})
export class OfficesService {

  constructor(
    private http: HttpClient
  ) { }

  getAllOffices(countryName?: string) {
    const query = countryName ? `?country=${countryName}` : ''
    return this.http.get<Office[]>(`${apiURL}/offices${query}`)
  }
}
