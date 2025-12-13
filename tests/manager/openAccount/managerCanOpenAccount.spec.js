import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage} from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
  const customerPage = new AddCustomerPage(page);
 
  await customerPage.open();

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await customerPage.fillFirstName(firstName);
  await customerPage.fillLastName(lastName);
  await customerPage.fillPostalCode(postalCode);

  await customerPage.clickAddCustomerButton();
  await customerPage.reloadPage();
});

test('Assert manager can add new customer', async ({ page }) => {
  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.
  */
  const openAccount = new OpenAccountPage(page);
  const customerListPage = new CustomersListPage(page);
  await openAccount.open();
  
  await openAccount.selectUser(firstName,lastName);
  await openAccount.selectCurrency();
  await openAccount.clickProcessButton();
  await openAccount.reloadPage();
  await openAccount.goToCustomerPage();
  await customerListPage.lastClientHaveAccountNumber();
});
