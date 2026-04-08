import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

test('Manager can add a new customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust');

  const fName = faker.person.firstName();
  const lName = faker.person.lastName();
  const pCode = faker.location.zipCode();

 
  page.once('dialog', dialog => dialog.accept());

  await addCustomerPage.addCustomer(fName, lName, pCode);


  await page.click('button[ng-click="showCust()"]');
  await expect(page.locator('table tbody tr').last()).toContainText(fName);
});