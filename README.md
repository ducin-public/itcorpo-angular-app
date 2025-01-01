# `itcorpo-angular-app`

- required node: v18+ at least

## setup

### TS

- try turning TS `strict` flags ON (`tsconfig.json`)


### cypress

- config: `cypress.config.ts`, see [docs](https://docs.cypress.io/guides/references/configuration)
- [`@cypress/schematics`](https://www.npmjs.com/package/@cypress/schematic) used via `ng add @cypress/schematic --e2e --component`
  - [adding new tests](https://github.com/cypress-io/cypress/tree/develop/npm/cypress-schematic#adding-e2e-and-component-testing): `ng generate spec [{name}] [--component] --[path {path}]`
