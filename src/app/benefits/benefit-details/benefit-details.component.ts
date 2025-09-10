import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { BenefitsService } from 'src/app/api/benefits.service';
import { BenefitSubscription } from 'src/app/api/data-contracts';

@Component({
  selector: 'itcorpo-benefit-details',
  templateUrl: './benefit-details.component.html'
})
export class BenefitDetailsComponent implements OnInit {
  benefit$!: Observable<BenefitSubscription>;

  constructor(
    private route: ActivatedRoute,
    private benefitsService: BenefitsService
  ) {}

  ngOnInit() {
    this.benefit$ = this.route.params.pipe(
      switchMap(params => this.benefitsService.getBenefitById(params['id']))
    );
  }
}
