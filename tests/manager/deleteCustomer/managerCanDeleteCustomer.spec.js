import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Delete customer',() => { 
  let firstName, lastName, zipCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  zipCode = faker.location.zipCode();
  await addCustomerPage.open();
  await addCustomerPage.fillCustomerForm(firstName, lastName, zipCode);
});
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
test('Assert manager can delete customer', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);
  await customersListPage.open();
  await customersListPage.deleteLastCustomer();
  await expect(page.locator('table')).not.toContainText([firstName, lastName, zipCode]);
  await customersListPage.reloadPage();
  await expect(page.locator('table')).not.toContainText([firstName, lastName, zipCode]);
});
});
