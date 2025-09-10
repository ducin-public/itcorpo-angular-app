import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { apiURL } from './config';
import { BenefitSubscription } from './data-contracts';

@Injectable({
  providedIn: 'root'
})
export class BenefitsService {

  constructor(
    private http: HttpClient
  ) { }

  deleteBenefit(id: BenefitSubscription['id']) {
    return this.http.delete(`${apiURL}/benefits/${id}`)
  }

  getBenefitById(id: BenefitSubscription['id']) {
    return this.http.get<BenefitSubscription>(`${apiURL}/benefits/${id}`)
  }

  getPage(page: number = 1, pageSize = 50) {
    const params = new HttpParams()
      .set('pageSize', String(pageSize))
      .set('page', String(page));

    return this.http.get<BenefitSubscription[]>(`${apiURL}/benefits`, { params })
  }

  getCount() {
    return this.http.get<number>(`${apiURL}/benefits/count`)
  }

  getAllBenefits() {
    return this.getPage()
  }
}
