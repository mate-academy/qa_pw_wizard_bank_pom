import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let addCustomerPage;
let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {

  addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.open();
  firstName = await addCustomerPage.addFakeCustomerFirstName();
  lastName = await addCustomerPage.addFakeCustomerLastName();
  postalCode = await addCustomerPage.addFakeCustomerPostCode();
  await addCustomerPage.addCustomerButtonClick();
  await addCustomerPage.acceptDialogWindowMessage();

});

test('Assert manager can search customer by First Name', async ({ page }) => {

  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  await customersListPage.fillFirstNameToSearchField(firstName);
  await customersListPage.fakeCustomerRawIsPresent(firstName, lastName, postalCode);
  await customersListPage.assertOnlyOneRowIsPresent();
  
});
