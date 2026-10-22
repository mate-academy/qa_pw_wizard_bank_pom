import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can add new customer', async ({ page }) => {
  /*
  Test:
  1. Open Wizard bank link
  2. Click [Bank Manager Login]
  3. Click [Add Customer]
  4. Fill First Name, Last Name and Post Code
  5. Click [Add Customer] and accept the alert
  6. Assert the alert says the customer was added successfully
  7. Click [Customers]
  8. Assert the new customer is in the list with the entered post code
     and without any account
  */
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.string.numeric(6);

  const bankHomePage = new BankHomePage(page);
  const managerPage = new BankManagerMainPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLoginButton();
  await managerPage.clickAddCustomerTab();
  await addCustomerPage.fillCustomerForm(firstName, lastName, postCode);
  const message = await addCustomerPage.submitAndGetAlertMessage();
  await addCustomerPage.assertAlertMessage(
    message,
    /Customer added successfully with customer id :\d+/
  );

  await managerPage.clickCustomersTab();
  await customersListPage.assertRowsCount(6);
  await customersListPage.assertCustomerIsVisible(firstName, lastName);
  await customersListPage.assertCustomerPostCode(firstName, lastName, postCode);
  await customersListPage.assertCustomerHasNoAccounts(firstName, lastName);
});


