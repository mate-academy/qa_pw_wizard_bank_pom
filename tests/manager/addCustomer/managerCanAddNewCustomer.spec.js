import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

test('Assert manager can add new customer', async ({ page }) => {
    const addCustomerPage = new AddCustomerPage(page);

    const firstName = faker.person.firstName(); 
    const lastName = faker.person.lastName();
    const postCode = faker.location.zipCode();

    await addCustomerPage.open();
    await addCustomerPage.fillField(addCustomerPage.firstName, firstName);
    await addCustomerPage.fillField(addCustomerPage.lastName, lastName);
    await addCustomerPage.fillField(addCustomerPage.postCode, postCode);
    await addCustomerPage.clickButton(addCustomerPage.formButton);
    await addCustomerPage.reloadPage();
    await addCustomerPage.clickButton(addCustomerPage.customersButton);

    await addCustomerPage.assertCustomerData(addCustomerPage.customarFirstName, firstName);
    await addCustomerPage.assertCustomerData(addCustomerPage.customarLastName, lastName);
    await addCustomerPage.assertCustomerData(addCustomerPage.customarPostCode, postCode);
    await addCustomerPage.assertCustomerAccountNumber();
});
