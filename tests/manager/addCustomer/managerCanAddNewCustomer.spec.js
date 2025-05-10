import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

test('Assert manager can add new customer', async ({ page }) => {
     const addCustomer = new AddCustomerPage(page);
     await addCustomer.open();
     await addCustomer.validRegister();
     await page.reload();
     await addCustomer.openCustomersList();
     await addCustomer.checkUserData();
});