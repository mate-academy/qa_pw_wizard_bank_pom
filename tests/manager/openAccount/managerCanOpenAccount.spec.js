import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can open an account for a customer', async ({
  page,
}) => {
  /*
  Test:
  1. Add a new customer (setup).
  2. Open the "Open Account" page.
  3. Select the new customer.
  4. Select a currency.
  5. Click [Process].
  6. Assert the success alert message is correct.
  7. Go to Customers, search for the customer.
  8. Assert the account cell in the last row is no longer empty.
  */

  const addCustomerPage = new AddCustomerPage(page);
  const bankManagerMainPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);
  const openAccountPage = new OpenAccountPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();
  const fullName = `${firstName} ${lastName}`;

  // Setup: create a customer
  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostalCode(postCode);
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.reload();

  // Act: open an account
  await bankManagerMainPage.clickOpenAccountButton();
  await openAccountPage.selectCustomer(fullName);
  await openAccountPage.selectCurrency('Dollar');
  const alertText = await openAccountPage.clickProcessButtonAndGetAlertText();
  expect(alertText).toContain('Account created successfully');

  // Assert: the account now shows up for that customer
  await bankManagerMainPage.clickCustomersButton();
  await customersListPage.searchCustomer(postCode);
  await customersListPage.assertLastRowAccountCellIsNotEmpty();
});