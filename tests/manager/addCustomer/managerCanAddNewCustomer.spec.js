import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can add new customer', async ({ page }) => {


    const  addCustomerPage = new  AddCustomerPage(page);
    const customersListPage = new CustomersListPage(page);


    const firstName = faker.person.firstName();
    const lastName =  faker.person.lastName();
    const postCode = faker.location.zipCode();

    await addCustomerPage.open()
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostalCode(postCode);
    await addCustomerPage.clickAddCustomer();
    await page.reload();
    await addCustomerPage.clickCustomerButton();
    

    await expect(customersListPage.firstNameCell).toHaveText(firstName);
    await expect(customersListPage.lastNameCell).toHaveText(lastName);
    await expect(customersListPage.postalCodeCell).toHaveText(postCode);
    await expect(customersListPage.accountNumberCell).toHaveText('');
});

