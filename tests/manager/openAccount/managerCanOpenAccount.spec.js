import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;

test.beforeEach(async ({ page }) => {
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  const postCode = faker.string.numeric(6);

  const managerPage = new BankManagerMainPage(page);
  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillCustomerForm(firstName, lastName, postCode);
  await addCustomerPage.clickSubmitButton();
  await managerPage.reload();
});

test('Assert manager can open an account for a new customer', async ({ page }) => {
  const managerPage = new BankManagerMainPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);

  await managerPage.clickOpenAccountTab();

  await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
  await openAccountPage.selectCurrency('Dollar');

  const message = await openAccountPage.submitAndGetAlertMessage();
  await openAccountPage.assertAlertMessage(message, /Account created successfully/);
  const accountNumber = openAccountPage.getAccountNumberFromMessage(message);
 

  await managerPage.reload();
  await managerPage.clickCustomersTab();
  
  await customersListPage.assertCustomerIsVisible(firstName, lastName);
  await customersListPage.assertCustomerHasAccount(firstName, lastName, accountNumber);
});