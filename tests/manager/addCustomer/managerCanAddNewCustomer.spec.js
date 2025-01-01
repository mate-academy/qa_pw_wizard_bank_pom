import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

test('Assert manager can add new customer', async ({ page }) => {

const addCustomerPage = new AddCustomerPage(page); 
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const postCode = faker.location.zipCode(); 

await addCustomerPage.open();
await addCustomerPage.fillFirstNameInputField(firstName);
await addCustomerPage.fillLastNameInputField(lastName);
await addCustomerPage.fillPostCodeInputField(postCode);
await addCustomerPage.clickAddCustomerButton();
await addCustomerPage.reload();

await addCustomerPage.clickCustomersButton();
await addCustomerPage.assertCustomersTableContainsFirstName(firstName);
await addCustomerPage.assertCustomersTableContainsLastName(lastName);
await addCustomerPage.assertCustomersTableContainsPostalCode(postCode);
await addCustomerPage.assertAccountNumberInCustomersTableIsEmpty();
});