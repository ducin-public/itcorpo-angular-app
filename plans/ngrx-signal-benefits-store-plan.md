# ngrx Signal Store Plan for Benefits Listing

## Task receipt
Design an NgRx Signal-based store to be used by `benefit-listing` and all nested components (`benefit-card`, `benefit-details`) and features. Deliver a structured plan: state shape, computed/derived values, methods/APIs, side-effect patterns, migration notes, edge cases, and next steps.

## Checklist
- [x] Analyze `src/app/benefits` components and services
- [ ] Design store shape and entity normalization
- [ ] Define computed values (selectors/derived signals)
- [ ] Specify store API and methods
- [ ] Suggest files to create and integration steps
- [ ] Provide edge cases and QA notes

## Summary of existing code (analysis)
Files inspected:
- `src/app/benefits/benefit-listing/benefit-listing.component.ts` and `.html`
- `src/app/benefits/benefit-card/benefit-card.component.ts`
- `src/app/benefits/benefit-details/benefit-details.component.ts`
- `src/app/benefits/benefits.module.ts`

Key observations:
- `BenefitListingComponent` currently calls `BenefitsService.getAllBenefits()` and exposes `benefits$` Observable to template; it handles a simple search input (unwired) and displays count and a grid of `itcorpo-benefit-card` components.
- `BenefitCardComponent` accepts an `@Input() benefit` and exposes a `delete` EventEmitter (not used in listing) and has local helper `getTypeClass` for styling.
- `BenefitDetailsComponent` reads route `id` and fetches a single benefit via `BenefitsService.getBenefitById(id)`.
- `BenefitsService` (not yet fully inspected here) likely provides the API to fetch lists and single items.

Implication: components are currently tightly coupled to `BenefitsService` Observables.

## Goals for the NgRx Signal Store
- Provide a single source of truth for benefits state (list, by-id, loading/error states, filtering, sorting, pagination, selection)
- Replace direct service calls in components with store consumption (signals & derived selectors)
- Centralize side effects: load list, load single item, create/update/delete flows with optimistic updates & error handling
- Keep API ergonomic for Angular components: expose readonly signals and methods (dispatch-like functions)

## State shape (normalized)
Use a normalized entity pattern keyed by `id` to allow O(1) access and easy updates.

Root: BenefitsState
- entities: Record<string, BenefitSubscription>  // normalized by id
- ids: string[]                                 // ordering from server or current sort
- listQuery: {
    filterText: string | null,
    sortBy: string | null,
    sortDir: 'asc' | 'desc' | null,
    page: number,
    pageSize: number
  }
- list: {
    loading: boolean,
    loaded: boolean,
    error: any | null,
    lastUpdated: number | null,
    total: number | null
  }
- selectedId: string | null
- details: Record<string, { loading:boolean; loaded:boolean; error:any|null }>
- optimistic: { [tempId: string]: Partial<BenefitSubscription> } // for optimistic creates
- ui: {
    expandedCards: Record<string, boolean> // if needed
  }

Rationale: this supports listing (with pagination), single-item details, and optimistic create/update/delete.

## Derived values / computed signals
Expose the following signals/computeds for components:
- benefitsList$: Signal<BenefitSubscription[]> — derived by mapping `ids` to `entities` and applying client-side filter/sort/pagination (if server doesn't handle it)
- availableCount$: Signal<number> — length of currently visible list
- loading$: Signal<boolean> — from `list.loading`
- error$: Signal<any | null> — from `list.error`
- benefitById$(id): Signal<BenefitSubscription | undefined> — entity lookup signal
- selectedBenefit$: Signal<BenefitSubscription | undefined> — computed from `selectedId`
- hasUnsyncedChanges$: Signal<boolean> — whether optimistic map non-empty
- isBenefitLoading$(id): Signal<boolean>
- filterText$, page$, pageSize$, sortBy$ — base signals for UI controls

For templates using the `| async` pattern currently, migrating to signals allows direct binding using signals via `let`/`toObservable` or the new signal binding in templates (Angular 16+). Components can inject the store and read signals directly.

## Store API (methods / actions)
Expose a small imperative API (service-like) backed by NgRx Signal state management. Example signatures:

- loadAll(options?: Partial<Pick<BenefitsState['listQuery'], 'page' | 'pageSize' | 'sortBy' | 'sortDir' | 'filterText'>>): Promise<void>
- loadById(id: string): Promise<BenefitSubscription | undefined>
- select(id: string | null): void
- create(payload: Partial<BenefitSubscription>): Promise<BenefitSubscription>
- update(id: string, changes: Partial<BenefitSubscription>): Promise<BenefitSubscription>
- delete(id: string): Promise<void>
- setFilterText(text: string): void
- setPage(page: number): void
- setSort(sortBy: string, sortDir: 'asc' | 'desc') : void

These methods should trigger side-effects handled via effect-like services (e.g., using RxJS in an injectable store service). Prefer returning Promises for imperative flows and dispatching internal state transitions for UI reactivity.

## Side-effects and patterns
- Use an injectable `BenefitsStore` that holds signals for the state and exposes the API above.
- Side-effects (HTTP calls) should be performed inside the store using `RxJS` + `toSignal` or plain `async/await` with careful loading/error updates.
- Support optimistic updates for `create` and `delete` where UX benefits outweigh complexity. Rollback on error.
- Use exponential backoff / retry for transient HTTP failures where helpful, but surface permanent errors to UI.

## Migration notes for existing components
- `BenefitListingComponent`: replace `benefits$ = benefitSvc.getAllBenefits()` with `constructor(private benefitsStore: BenefitsStore) { }` and in `ngOnInit()` call `this.benefitsStore.loadAll()` and use `benefits = this.benefitsStore.benefitsList` (a signal) in template. Replace `| async` usage.
- `BenefitCardComponent`: keep same input; optionally accept the store and call `delete` via `benefitsStore.delete(id)` instead of emitting events.
- `BenefitDetailsComponent`: instead of calling `benefitsService.getBenefitById`, call `benefitsStore.loadById(id)` and read `benefitsStore.benefitById(id)`.

## Files to create
- `src/app/benefits/state/benefits.store.ts` — main injectable store with signals and API methods.
- `src/app/benefits/state/benefits.models.ts` — shared types for state shape and possibly helper entity adapters.
- `src/app/benefits/state/benefits.effects.ts` (optional) — if you prefer RxJS-based observable effects separate from the store class.
- `src/app/benefits/state/benefits.spec.ts` — unit tests for store logic (happy path + error/rollback cases).

## Example store contract (mini)
- Signals exposed:
  - benefitsList: Signal<BenefitSubscription[]>
  - loading: Signal<boolean>
  - error: Signal<any | null>
  - benefitById(id: string): Signal<BenefitSubscription | undefined>

- Methods:
  - loadAll(options?): Promise<void>
  - loadById(id): Promise<BenefitSubscription | undefined>
  - create(payload): Promise<BenefitSubscription>
  - update(id, changes): Promise<BenefitSubscription>
  - delete(id): Promise<void>

## Edge cases and considerations
- Concurrent loads: if user navigates quickly between detail pages, ensure earlier calls don't overwrite newer data (use request tokens or track current loading id).
- Stale data: decide TTL for cached entities and whether `loadAll` always refreshes from server or uses cache.
- Partial entities: server might return different shapes for list vs details; normalize and merge carefully.
- Large lists: consider server-side pagination; keep client-side only if dataset small.
- Error handling: provide per-operation errors and global list errors so UI can show contextual messages.

## Testing and quality gates
- Unit tests for store reducer-like logic, optimistic update rollbacks, and computed signals.
- Small integration test: mount `BenefitListingComponent` and stub `BenefitsStore` to confirm template displays signals correctly.

## Risks and mitigations
- If the team expects plain NgRx (Store/Effects) instead of the signal pattern, this change introduces a different mental model—mitigate with docs and small training.
- Potential duplication with existing `BenefitsService` — keep the service as the thin HTTP client and centralize orchestration in `BenefitsStore`.

## Next steps (recommended)
1. Implement `benefits.models.ts` and `benefits.store.ts` with minimal `loadAll` and `benefitsList` signals.
2. Migrate `BenefitListingComponent` to use the store and add unit tests.
3. Implement `loadById` and migrate `BenefitDetailsComponent`.
4. Add create/update/delete flows with optimistic update tests.
5. Iterate on derived signals (filtering, sorting, pagination) and add UI bindings for search and controls.

---

Plan authoring: automated architect assistant. Ask if you want the initial `benefits.store.ts` scaffold implemented in this repo.
