import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

test('Assert validation message is present when to add customer with empty fields', async ({ page }) => {
  /* 
  Test:
  1. Open Add Customer page.
  2. Click [Add Customer].
  3. Assert the validation message is present on FirstName field.
  */
 const addCustomerPage = new AddCustomerPage(page);
    await addCustomerPage.open();
    await addCustomerPage.clickAddCustomerButton();
    await addCustomerPage.assertValidationMessageForFirstName();
});
