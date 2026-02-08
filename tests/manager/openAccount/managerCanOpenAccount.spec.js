import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let addCustomerPage;
let openAccountPage;
let bankManagerMainPage;
let customersListPage;
let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  addCustomerPage = new AddCustomerPage(page);
  openAccountPage = new OpenAccountPage(page);
  customersListPage = new CustomersListPage(page);
  bankManagerMainPage = new BankManagerMainPage(page);
  firstName= faker.person.firstName();
  lastName= faker.person.lastName();
  postalCode= faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.fillLastNameField(lastName);
  await addCustomerPage.fillPostCodeField(postalCode);
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.reload();
});

test('Assert manager can add new customer', async ({ page }) => {
  await addCustomerPage.clickOpenAccountButton();
  await addCustomerPage.awaitPageLoad();
  await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();
  await page.reload();
  await bankManagerMainPage.clickCustomersButton();
  const lastRaw = await customersListPage.getLastCustomerRow();
  await customersListPage.assureUserHasAccountNumber(lastRaw);
});
