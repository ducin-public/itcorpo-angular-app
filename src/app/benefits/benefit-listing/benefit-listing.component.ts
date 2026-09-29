import { Component, OnInit, ChangeDetectionStrategy, resource, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { httpResource } from '@angular/common/http';
import { BenefitsService } from 'src/app/api/benefits.service';
import { Router } from '@angular/router';
import {form, FormField} from '@angular/forms/signals';

import { Observable, firstValueFrom } from 'rxjs';

import { BenefitSubscription } from 'src/app/api/data-contracts';
import { apiURL } from 'src/app/api/config';

@Component({
    selector: 'itcorpo-benefit-listing',
    templateUrl: './benefit-listing.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class BenefitListingComponent implements OnInit {
  benefits$!: Observable<BenefitSubscription[]>

  // /*
  //  * resource({ ... }) - generic, Promise-based
  //  * - params: () => R | undefined
  //  *     reactive "request" computed from signals; whenever it changes, the loader re-runs.
  //  *     Return undefined to keep the resource idle (e.g. no id selected yet) - there's no `enabled` flag.
  //  * - loader: ({ params, abortSignal, previous }) => Promise<T>
  //  *     does the actual async work. Pass abortSignal to fetch() so an outdated request gets cancelled
  //  *     when params change (built-in "switchMap"). previous.status lets you react to the prior state.
  //  * - defaultValue: T
  //  *     what value() returns while idle or loading, so the type isn't `T | undefined` (e.g. [] for lists).
  //  * - equal: (a, b) => boolean
  //  *     custom equality - skips notifying consumers when a reload returns "the same" data.
  //  * - injector
  //  *     needed only when created outside an injection context (e.g. inside a method, not a field).
  //  */
  // benefitsResource_ = resource({
  //   loader: () => firstValueFrom(this.benefitSvc.getAllBenefits()),
  // })

  // benefitsResource = resource({
  //   loader: async ({ abortSignal }) => {
  //     const res = await fetch(`${apiURL}/benefits?page=1&pageSize=50`, { signal: abortSignal });
  //     if (!res.ok) {
  //       throw new Error(`HTTP ${res.status}`);
  //     }
  //     return (await res.json()) as BenefitSubscription[];
  //   },
  // });

  // /*
  //  * httpResource<T>(request, options) - resource on top of HttpClient (interceptors apply, JSON by default)
  //  * - request: () => string | HttpResourceRequest | undefined
  //  *     reactive like `params` above; a plain URL string or { url, method, params, headers, body,
  //  *     withCredentials, context, ... }. Return undefined to skip the request.
  //  * - options.parse: (raw: unknown) => T
  //  *     runtime validation/mapping of the response (e.g. zod schema) - the <T> generic alone is just a type cast.
  //  * - options.defaultValue / options.equal / options.injector - same meaning as in resource().
  //  * - httpResource.text / .blob / .arrayBuffer - variants for non-JSON responses.
  //  * Extras on the ref: headers(), statusCode(), progress().
  //  * It takes a request descriptor, not an Observable, so it mirrors getAllBenefits() (getPage(1, 50)).
  //  */
  // benefitsHttpResource = httpResource<BenefitSubscription[]>(() => ({
  //   url: `${apiURL}/benefits`,
  //   params: { page: 1, pageSize: 50 },
  // }))

  // /*
  //  * rxResource({ ... }) - resource for Observable-based code (reuse existing services as-is)
  //  * - params: same as in resource().
  //  * - stream: ({ params, previous }) => Observable<T>
  //  *     subscribed on each params change, previous subscription gets unsubscribed (cancels the HTTP call).
  //  *     Unlike loader, it may emit many times (websocket, polling) - value() follows each emission.
  //  *     Must emit at least once or error - completing empty throws NG0991.
  //  * - defaultValue / equal / injector: same as in resource().
  //  */
  // benefitsRxResource = rxResource({
  //   stream: () => this.benefitSvc.getAllBenefits(),
  // })

  // /*
  //  * toSignal(obs$, options) - just bridges an Observable into a signal, no loading/error/reload API
  //  * - initialValue
  //  *     value until the first emission; without it the type is `T | undefined`.
  //  * - requireSync: true
  //  *     for observables that emit synchronously (BehaviorSubject, store selectors) - removes `undefined`
  //  *     from the type, throws at runtime if nothing was emitted on subscribe.
  //  * - equal: custom equality, as above.
  //  * - manualCleanup / injector
  //  *     by default it unsubscribes when the injection context (component) is destroyed.
  //  * Subscribes immediately (eagerly) and exactly once - no re-fetch on param change. Errors are re-thrown on read.
  //  */
  // benefitsSignal = toSignal(this.benefitSvc.getAllBenefits())

  constructor(
    private benefitSvc: BenefitsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.benefits$ = this.benefitSvc.getAllBenefits()
  }

  showDetails(benefit: BenefitSubscription) {
    this.router.navigate(['benefits', benefit.id]);
  }

  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });
  loginForm = form(this.loginModel);
  onSubmit(event: Event) {
    event.preventDefault();
    // Perform login logic here
    const credentials = this.loginModel();
    const x = this.loginForm.password()
    // x.
    console.log('Logging in with:', credentials);
    // e.g., await this.authService.login(credentials);
  }
}


interface LoginData {
  email: string;
  password: string;
}
