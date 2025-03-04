import { test } from '@playwright/test';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test( 'Add and Delete new customer', async ({ page }) => {
  const customersList = new CustomersListPage(page);
  const managerPage = new BankManagerMainPage(page);
  await managerPage.ManagerLogin();
  await customersList.addNewCustomer();
  await customersList.openCustomersPage();
  await customersList.deleteAddedCustomer();
});