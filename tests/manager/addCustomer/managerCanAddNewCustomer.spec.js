import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

test('Assert manager can add new customer', async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page);
  

  await addCustomerPage.open();
  const firstName = await addCustomerPage.addFakeCustomerFirstName();
  const lastName = await addCustomerPage.addFakeCustomerLastName();
  const postalCode = await addCustomerPage.addFakeCustomerPostCode();
  await addCustomerPage.addCustomerButtonClick();
  await addCustomerPage.acceptDialogWindowMessage();
  await addCustomerPage.customersButtonClick();
  await addCustomerPage.assertFakeCustomerInLastRow(firstName, lastName, postalCode);
  await addCustomerPage.assertNoAccountNumberInLastRow();

  });