import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

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
  /* await page.reload(); */

  });

test('Assert manager can add new customer', async ({ page }) => {

  const openAccountPage = new OpenAccountPage(page);
  const addCustomerPage = new AddCustomerPage(page);

  await openAccountPage.open();
  await openAccountPage.selectCustomerByName(firstName, lastName);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();
  await openAccountPage.acceptDialogWindowMessage();
  /* await page.reload(); */
  await addCustomerPage.customersButtonClick();
  await addCustomerPage.assertAccountNumberInLastRow();
  
});
