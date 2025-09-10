import { Component, OnInit } from '@angular/core';
import { BenefitsService } from 'src/app/api/benefits.service';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { BenefitSubscription } from 'src/app/api/data-contracts';

@Component({
  selector: 'itcorpo-benefit-listing',
  templateUrl: './benefit-listing.component.html'
})
export class BenefitListingComponent implements OnInit {
  benefits$!: Observable<BenefitSubscription[]>

  constructor(
    private benefitSvc: BenefitsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.benefits$ = this.benefitSvc.getAllBenefits()
  }

  showDetails(benefit: BenefitSubscription) {
    this.router.navigate(['benefits', benefit.id]);
  }
}
