import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';


test('Assert manager can add new customer', async ({ page }) => {
const addCustomerPage = new AddCustomerPage(page);
const customersListPage = new CustomersListPage(page); 

await addCustomerPage.open();

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
await addCustomerPage.fillFirstNameField(firstName);
await addCustomerPage.fillLastNameField(lastName);

const postCode = faker.number.int(10000).toString();
await addCustomerPage.fillPostalCodeField(postCode);
await addCustomerPage.clickAddCustomerButton();

await page.reload();
await addCustomerPage.clickCustomersButton();
await customersListPage.assertLastRowFirstCellContainsText(firstName);
await customersListPage.assertLastRowSecondCellContainsText(lastName);
await customersListPage.assertLastRowThirdCellContainsText(postCode);
await customersListPage.assertLastRowForthCellContainsText('');
});