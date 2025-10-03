import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

  const addCustomerPage = new AddCustomerPage(page)

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await addCustomerPage.openAddCustomerPage();
  await addCustomerPage.waitForAddCustomerPage();
  await addCustomerPage.fillFirstNameField(firstName)
  await addCustomerPage.fillLastNameField(lastName)
  await addCustomerPage.fillPostCodeField(postalCode)
  await addCustomerPage.clickAddCustomerButton()
  page.on('dialog', dialog => dialog.accept())

});

test('Assert manager can search customer by First Name', async ({ page }) => {

  const bankManagerPage = new BankManagerMainPage(page)
  const customersListPage = new CustomersListPage(page)

  /* 
  Test:
  1. Open Customers page.
  2. Fill the firstName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */

  
  await bankManagerPage.openManagerMainPage()
  await bankManagerPage.waitManagerMainPage()
  await bankManagerPage.clickCustomerListLink()

  await customersListPage.waitCustomerListPage()
  await customersListPage.fillSearchField(firstName)
  //await customersListPage.elementTextDataEqual(customersListPage.getCustomerFirstName, firstName)
  await expect(customersListPage.getCustomerFirstName).toHaveText(firstName)
  await customersListPage.assertOneRowSearch()

});
