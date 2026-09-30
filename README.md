# Wizard Bank Playwright Tests

End-to-end tests for the [Wizard Bank](https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login) application, implemented with Playwright and the Page Object Model.

## Coverage

### Customer

- Customer login and login-state validation.
- Account data and switching between multiple accounts.
- Deposit success, balance update, and transaction history.
- Successful withdrawal and insufficient-balance withdrawal.
- Empty transactions table structure.
- Customer logout.

### Manager

- Bank manager login.
- Required add-customer fields and empty-form validation.
- Adding and deleting customers.
- Searching by first name, last name, and postal code.
- Selecting Dollar, Pound, and Rupee currencies.
- Opening Dollar and Pound accounts.

## Project structure

```text
src/pages/     Page Objects and reusable UI actions/assertions
tests/customer Customer workflows
tests/manager  Manager workflows
tests/fixtures Reusable Playwright fixtures
playwright.config.js  Playwright configuration and browser projects
```

## Setup

```bash
npm install
npx playwright install
```

## Run tests

Run the complete suite:

```bash
npx playwright test
```

Run a specific area:

```bash
npx playwright test tests/customer
npx playwright test tests/manager
```

Run one test file in Chromium:

```bash
npx playwright test tests/customer/accountOperations/withdrawCanBeOpened.spec.js --project=chromium
```

Open the interactive UI mode:

```bash
npx playwright test --ui
```

Run in headed debug mode:

```bash
npx playwright test --debug
```

View the HTML report after a run:

```bash
npx playwright show-report
```

## Tags

Tests are grouped with `@customer`, `@manager`, and `@smoke` tags:

```bash
npx playwright test --grep @customer
npx playwright test --grep @manager
npx playwright test --grep @smoke
```

## Fixtures

The manager customer fixture is located at `tests/fixtures/manager.fixture.js`.
It generates unique customer data, opens the add-customer page, creates the customer, and exposes the result as the `customer` fixture:

```js
import { test } from '../../fixtures/manager.fixture';

test('uses a prepared customer', async ({ customer }) => {
	console.log(customer.firstName);
});
```

The fixture runs only for tests that request `customer`, which keeps unrelated tests independent and removes repeated setup code.

## Test design

Tests use Page Objects instead of repeating raw selectors. Test data for manager workflows is generated with Faker, while stable default bank accounts are used for customer workflows where their initial balances are part of the expected application state.
