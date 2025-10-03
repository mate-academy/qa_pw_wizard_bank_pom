import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName
let lastName
let postCode
let addCustomerPage


test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

firstName = faker.person.firstName()
lastName = faker.person.lastName()
postCode = faker.location.zipCode()
addCustomerPage = new AddCustomerPage(page)

  await addCustomerPage.openAddCustomerPage()
  await addCustomerPage.waitForAddCustomerPage()
  await addCustomerPage.fillFirstNameField(firstName)
  await addCustomerPage.fillLastNameField(lastName)
  await addCustomerPage.fillPostCodeField(postCode)
  await addCustomerPage.clickAddCustomerButton()
  page.on('dialog', dialog => dialog.accept())
});

test('Assert manager can delete customer', async ({ page }) => {

  const bankManager = new BankManagerMainPage(page)
  const customerListPage = new CustomersListPage(page)

  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */

  await bankManager.openManagerMainPage()
  await bankManager.clickCustomerListLink()
  await expect(customerListPage.deleteCustomerButton).toBeVisible()
  await customerListPage.clickDeleteCustomerButton()
  await addCustomerPage.elementByTextHidden(lastName)
  await page.reload()
  await addCustomerPage.elementByTextHidden(lastName)

});
