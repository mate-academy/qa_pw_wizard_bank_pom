import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';


let firstName;
let lastName;
let postalCode;
test.beforeEach(async ({ page }) => {

    const customerPage = new AddCustomerPage(page);
    await customerPage.open();
    firstName = faker.person.firstName();
    await customerPage.fillFirstName(firstName);
    lastName = faker.person.lastName();
    await customerPage.fillSecondName(lastName);
    postalCode = faker.location.zipCode();
    await customerPage.fillPostalCode(postalCode);
    await customerPage.clickAddCustomersButton();

});

test('Assert manager can search customer by First Name', async ({ page }) => {

    const customersListPage = new CustomersListPage(page);
    await customersListPage.open();
    await customersListPage.clickCustomerButton();
    await customersListPage.fillInSearchInput(firstName);
    await expect(page.getByText(firstName)).toBeVisible();
    const rowCountAfterSearch = await page.getByRole('row').count();
    const rowsWithName = await page.getByRole('row').filter({ hasText: firstName }).count();
    expect(rowsWithName).toBe(rowCountAfterSearch - 1);
    


  

});
