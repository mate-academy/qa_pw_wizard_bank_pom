import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager cannot add new customer with empty fields', async ({ page }) => {
    const addCustomerPage = new AddCustomerPage(page);
    const customersListPage = new CustomersListPage(page);

    await addCustomerPage.open();
    await addCustomerPage.clickAddCustomerButton();
    await addCustomerPage.reload();
    await addCustomerPage.clickCustomersButton();
    await customersListPage.waitForOpened();
    await customersListPage.assertRowsCount(6);

});