import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';


test('Assert manager can choose currencies for account', async ({ page }) => {
  
  // створюємо екземпляр класу Open Account Page 
  const openAccountPage = new OpenAccountPage(page);

  // переходимо на сторінку 
  await openAccountPage.open();

  // перевіряємо наявність валют у випадаючому списку
  await openAccountPage.assertCurrency('Dollar');
  await openAccountPage.assertCurrency('Pound');
  await openAccountPage.assertCurrency('Rupee');

});
