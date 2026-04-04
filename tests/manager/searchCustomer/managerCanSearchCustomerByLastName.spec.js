import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postalCode = faker.location.zipCode(); 
    
    await addCustomerPage.open();
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostCode(postalCode);
    await addCustomerPage.clickButtonAddCustomer();
    await addCustomerPage.reloadPage();
});

test('Assert manager can search customer by Last Name', async ({ page }) => {
  const customerListPage = new CustomersListPage(page);
    await customerListPage.open();
    await customerListPage.fillPlaceholderSearchCustomer(lastName);
    await customerListPage.assertCustomerSearchRaw();
    await customerListPage.assertNextRowNotExist();
});
/* 
  Test:
  1. Open Customers page
  2. Fill the lastName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */