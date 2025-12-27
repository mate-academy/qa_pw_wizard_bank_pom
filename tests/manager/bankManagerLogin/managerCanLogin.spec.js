import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';


test('Assert manager can Login', async ({ page }) => {
  
  // створення екземплярів класів
  const bankHomePage = new BankHomePage(page);
  const bankManagerMainPage = new BankManagerMainPage(page);

  // відкриваємо головну сторінку і переходимо до логіну менеджера
  await bankHomePage.open();
  await bankHomePage.clickManagerLoginButton();

  // перевіряємо наявність кнопок на сторінці
  await bankManagerMainPage.isAddCustomerButtonVisible();
  await bankManagerMainPage.isOpenAccountButtonVisible();
  await bankManagerMainPage.isCustomersButtonVisible();

});
