import { Component, OnInit } from '@angular/core';
import { BenefitsService } from 'src/app/api/benefits.service';

import { Observable } from 'rxjs';

import { Benefit } from 'src/app/api/data-contracts';

@Component({
  selector: 'itcorpo-benefit-listing',
  templateUrl: './benefit-listing.component.html',
  styleUrls: ['./benefit-listing.component.css']
})
export class BenefitListingComponent implements OnInit {
  benefits$!: Observable<Benefit[]>

  constructor(
    private benefitSvc: BenefitsService,
  ) { }

  ngOnInit() {
    this.benefits$ = this.benefitSvc.getAllBenefits()
  }

}
