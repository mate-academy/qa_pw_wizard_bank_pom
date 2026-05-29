import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';


test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

    const customerPage = new AddCustomerPage(page);
    await customerPage.open();
    const firstName = faker.person.firstName();
    await customerPage.fillFirstName(firstName);
    const lastName = faker.person.lastName();
    await customerPage.fillSecondName(lastName);
    const postCode = faker.location.zipCode();
    await customerPage.fillPostalCode(postCode);
    await customerPage.clickAddCustomersButton();
});

test('Assert manager can delete customer', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);
  await customersListPage.open();
  await customersListPage.clickCustomerButton();

  // Capture name BEFORE deletion
  const customerName = await customersListPage.getLastRowName();

  await customersListPage.clickDeleteButton();
  await customersListPage.assertRowNotPresent(customerName);

  await customersListPage.reloadPage();
  await customersListPage.assertRowNotPresent(customerName);
});
