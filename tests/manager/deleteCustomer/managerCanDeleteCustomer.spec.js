import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { BankHomePage } from '../../../src/pages//BankHomePage';

let fullName;

test.beforeEach(async ({ page }) => {

  const customerPage = new AddCustomerPage (page);
  const managerMainPage = new BankManagerMainPage (page);
  const listPage = new CustomersListPage (page);
  const accountPage = new OpenAccountPage (page);
  const homePage = new BankHomePage (page);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();
  fullName = `${firstName} ${lastName} ${postCode}`;

await customerPage.open();
await customerPage.firstNameFieldFill(firstName);
await customerPage.lastNameFieldFill(lastName);
await customerPage.postCodeFieldFill(postCode);
await customerPage.AddCustomerButtonClick();


  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
});

test('Assert manager can delete customer', async ({ page }) => {
  const customerPage = new AddCustomerPage (page);
  const managerMainPage = new BankManagerMainPage (page);
  const listPage = new CustomersListPage (page);
  const accountPage = new OpenAccountPage (page);
  const homePage = new BankHomePage (page);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await listPage.open();
  const deleteButtonLast = page.getByRole('row', { name: fullName }).getByRole('button').last();
  await deleteButtonLast.click();
  await expect(deleteButtonLast).not.toBeVisible();
  await page.reload();
  await expect(deleteButtonLast).not.toBeVisible();


  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
});
