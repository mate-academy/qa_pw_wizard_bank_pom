import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager cannot find non-existent customer', async ({ page }) => {
const customersListPage = new CustomersListPage(page);
const addCustomerPage = new AddCustomerPage(page);
const nonExistentCustomerName = faker.string.uuid();
await addCustomerPage.open();
await addCustomerPage.clickCustomersButton();
await customersListPage.fillFirstName(nonExistentCustomerName);
await customersListPage.assertNumberOfRows(0);
});