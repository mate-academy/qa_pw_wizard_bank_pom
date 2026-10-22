import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can search customer by Postal Code', async ({ page }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postalCode = faker.location.zipCode();

  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostalCode(postalCode);
  await addCustomerPage.clickAddCustomerButton();

  await customersListPage.open();
  await customersListPage.searchCustomer(postalCode);

  await customersListPage.assertCustomerIsVisible(
    firstName,
    lastName,
    postalCode,
  );

  await customersListPage.assertOnlyOneCustomerIsVisible();
});