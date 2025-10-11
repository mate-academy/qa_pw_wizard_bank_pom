import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

const allowedCurrencies = ['Dollar','Pound','Rupee'];
let firstName;
let lastName;
let postCode;
let currency;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();
  currency = faker.helpers.arrayElement(allowedCurrencies);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickSubmitAddCustomerButton();
  await page.reload();
});

test('Assert manager can add new customer', async ({ page }) => {
  const bankManagerMainPage = new BankManagerMainPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);

  await bankManagerMainPage.open();
  await bankManagerMainPage.clickOpenAccountButton();
  await openAccountPage.selectCustomerName(firstName,lastName);
  await openAccountPage.selectCurrency(currency);
  await openAccountPage.clickProcessButton();
  await page.reload();
  await bankManagerMainPage.clickCustomersButton();
  await customersListPage.assertCustomerAccountNumberIsNotEmpty(firstName,lastName,postCode);
});
