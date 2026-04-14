import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test.describe('Manager can add a new customer', () => {
  let firstName, lastName, postCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();
  await addCustomerPage.open();
  await addCustomerPage.fillCustomerForm(firstName, lastName, postCode);
  await addCustomerPage.reloadPage();
});  
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
test('Assert manager can add new customer', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  const bankManagerMainPage = new BankManagerMainPage(page);
  const fullName = `${firstName} ${lastName}`;
  const customersListPage = new CustomersListPage(page);
  await openAccountPage.open();
  await openAccountPage.selectCustomer(fullName);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcess();
  await openAccountPage.reloadPage();
  await bankManagerMainPage.clickCustomersButton();
  const lastAccountNumber = customersListPage.tableRows.last().locator('td').nth(3);
  await expect(lastAccountNumber).toHaveText(/\d+/);
});
});
