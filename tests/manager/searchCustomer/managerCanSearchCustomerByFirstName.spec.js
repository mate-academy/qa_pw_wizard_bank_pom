import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Manager can search customer by First Name', () => {
  let firstName, lastName, postCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();
  await addCustomerPage.open();
  await addCustomerPage.fillCustomerForm(firstName, lastName, postCode);
  await addCustomerPage.reloadPage();
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
});
test('Assert manager can search customer by First Name', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);
  await customersListPage.open();
  await customersListPage.searchCustomerByFirstName(firstName);
  await expect(customersListPage.tableRows.last()).toContainText(firstName);
  await expect(customersListPage.page.locator('table tbody tr')).toHaveCount(1);  
});
});
