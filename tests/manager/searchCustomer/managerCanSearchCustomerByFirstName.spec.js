import { test } from '@playwright/test';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { AddCustomerPage } from '../../../src/pages/manager/OpenAccountPage';

test.beforeEach( async ({ page }) => {
  const managerPage = new BankManagerMainPage(page);
  const customerPage = new CustomersListPage(page);
  await managerPage.ManagerLogin();
  await customerPage.addNewCustomer();
});

test('Assert manager can search customer by First Name', async ({ page }) => {
  const accountPage = new AddCustomerPage(page);
  const customerPage = new CustomersListPage(page);
  await customerPage.openCustomersPage();
  await accountPage.findByFirstName();
});