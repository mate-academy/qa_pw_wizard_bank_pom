import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';


  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const postCode = faker.location.zipCode()


test.beforeEach(async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page)


  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */

  await addCustomerPage.openAddCustomerPage();
  await addCustomerPage.waitForAddCustomerPage();
  await addCustomerPage.fillFirstNameField(firstName)
  await addCustomerPage.fillLastNameField(lastName)
  await addCustomerPage.fillPostCodeField(postCode)
  await addCustomerPage.clickAddCustomerButton()
  page.on('dialog', dialog => dialog.accept())

});

test('Assert manager can add new customer', async ({ page }) => {

  const bankManagerMainPage = new BankManagerMainPage(page)
  const accountPage = new OpenAccountPage(page)
  const customersListPage = new CustomersListPage(page)

  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */

  await bankManagerMainPage.clickAccountLink()
  await accountPage.waitForOpenManagerAccount()
  await accountPage.selectCustomer(firstName +' '+lastName)
  await accountPage.selectCurrency('Dollar')
  await accountPage.clickProcessButton()
  page.on('dialog', d => d.accept())
  await bankManagerMainPage.clickCustomerListLink()
  await customersListPage.assertCustomerNumberNotEmpty()

});
