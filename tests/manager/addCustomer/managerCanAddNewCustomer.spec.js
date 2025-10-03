import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage'
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let addCustomer
let customersListPage
let firstName
let lastName
let postalCode

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

  addCustomer = new AddCustomerPage(page)
  customersListPage = new CustomersListPage(page)
  firstName = faker.person.firstName()
  lastName = faker.person.lastName()
  postalCode = faker.location.zipCode()

});

test('Assert manager can add new customer', async ({ page }) => {



  /* 
  Test:
  1. Open add customer page by link
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup)
  7. Click [Customers] button.
  8. Assert the customer First Name is present in the table in the last row. 
  9. Assert the customer Last Name is present in the table in the last row. 
  10. Assert the customer Postal Code is present in the table in the last row. 
  11. Assert there is no account number for the new customer in the last row. 

  Tips:
  1. Use faker for test data generation, example usage:
    const firstName = faker.person.firstName();
    const lastName = faker.person.LastName();
    const postCode = faker.location.zipCode(); 

  2. Do not rely on the customer row id for the steps 8-11. 
    Use the ".last()" locator to get the last row.
  */

  await addCustomer.openAddCustomerPage();
  await addCustomer.waitForAddCustomerPage();
  await addCustomer.fillFirstNameField(firstName)
  await addCustomer.fillLastNameField(lastName)
  await addCustomer.fillPostCodeField(postalCode)
  await addCustomer.clickAddCustomerButton()
  page.on('dialog', d => d.accept())
  await addCustomer.clickCustomersListLink()
  await customersListPage.waitCustomerListPage()
  await customersListPage.elementTextDataEqual(customersListPage.getCustomerFirstName, firstName)
  await customersListPage.elementTextDataEqual(customersListPage.getCustomerLastName, lastName)
  await customersListPage.elementTextDataEqual(customersListPage.getCustomerPostCode, postalCode)
  await customersListPage.elementTextDataEqual(customersListPage.getCustomerNumber, '')

});


test('New user is not created with Empty First name field', async ({ page }) => {
  await customersListPage.openCustomerListPage()
  await customersListPage.waitCustomerListPage()
  await expect(page.locator('tbody')).toBeVisible()

  const countRawBeforeAddCustomer = await customersListPage.allRaws.count()

  await addCustomer.openAddCustomerPage();
  await addCustomer.waitForAddCustomerPage();
  await addCustomer.fillLastNameField(lastName)
  await addCustomer.fillPostCodeField(postalCode)
  await addCustomer.clickAddCustomerButton()
  page.on('dialog', d => d.accept())
  await addCustomer.clickCustomersListLink()
  await customersListPage.waitCustomerListPage()

  const countRawAfterAddCustomer = await customersListPage.allRaws.count()
  expect(countRawBeforeAddCustomer).toBe(countRawAfterAddCustomer)

});


test('New user is not created with Empty Last name field', async ({ page }) => {
  await addCustomer.openAddCustomerPage();
  await addCustomer.waitForAddCustomerPage();
  await addCustomer.fillFirstNameField(firstName)
  await addCustomer.fillPostCodeField(postalCode)
  await addCustomer.clickAddCustomerButton()
  page.on('dialog', d => d.accept())
  await addCustomer.clickCustomersListLink()
  await customersListPage.waitCustomerListPage()
  await customersListPage.elementTextDataNotEqual(customersListPage.getCustomerFirstName, firstName)
});