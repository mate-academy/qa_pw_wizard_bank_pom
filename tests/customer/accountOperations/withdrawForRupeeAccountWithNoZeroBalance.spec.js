import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test.beforeEach( async ({ page }) => {
  const customerLoginPage = new CustomerLoginPage(page); 
  const accountPage = new CustomerAccountPage(page); 
  
  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Ron Weasly');
  await customerLoginPage.clickLoginButton();
  
  await accountPage.selectAccount('1009');0
  await accountPage.clickDepositButton();
  
  const amount = faker.number.int({ min: 100, max: 200 }).toString();
  
  await accountPage.fillAmountInputField(amount);
  await accountPage.clickDepositFormButton();
  
  await accountPage.assertDepositSuccessfulMessageIsVisible();
});

test('Assert the customer can withdraw money with no empty balance', async ({ page }) => {
  
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Ron Weasly');
  await customerLoginPage.clickLoginButton();
  
  await accountPage.selectAccount('1009');
  await accountPage.clickWithdrawlButton();

  const amount = faker.number.int(100).toString();
  await accountPage.fillAmountInputField(amount);
  await accountPage.clickWithdrawlFormButton();

  await accountPage.assertSuccessfulWithdrawMessageIsVisible();
});