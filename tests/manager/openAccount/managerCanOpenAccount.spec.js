import { test, expect } from '@playwright/test';
import { BankManagerMainPage } from '../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../src/pages/manager/OpenAccountPage';
import { faker } from '@faker-js/faker';

test('Manager can open account for customer', async ({ page }) => {
  const bankManagerPage = new BankManagerMainPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const openAccountPage = new OpenAccountPage(page);

  await bankManagerPage.open();

  // Step 1: Add a customer first
  await bankManagerPage.goToAddCustomer();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();
  await addCustomerPage.addCustomer(firstName, lastName, postCode);

  // Step 2: Open account for this customer
  await bankManagerPage.goToOpenAccount();
  await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcess();
});
