import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Manager can create multiple accounts for the same customer', async ({
  page,
}) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  const customerName = `${firstName} ${lastName}`;

  const addCustomerPage = new AddCustomerPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);

  // Create customer
  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomerButton();
  await page.reload();

  // Create Dollar account
  await openAccountPage.open();
  await openAccountPage.selectCustomer(customerName);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.process();
  await page.reload();

  // Create Pound account for the same customer
  await openAccountPage.selectCustomer(customerName);
  await openAccountPage.selectCurrency('Pound');
  await openAccountPage.process();
  await page.reload();

  // Verify customer has two accounts
  await customersListPage.open();

  await customersListPage.assertCustomerHasAccountCount(
    firstName,
    lastName,
    postCode,
    2,
  );
});