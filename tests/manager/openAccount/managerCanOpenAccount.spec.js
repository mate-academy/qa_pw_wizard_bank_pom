import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { BankHomePage } from '../../../src/pages//BankHomePage';

let fullName;

test.beforeEach(async ({ page }) => {
    const customerPage = new AddCustomerPage (page);
    const managerMainPage = new BankManagerMainPage (page);
    const listPage = new CustomersListPage (page);
    const accountPage = new OpenAccountPage (page);
    const homePage = new BankHomePage (page);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postCode = faker.location.zipCode();

    fullName = `${firstName} ${lastName} ${postCode}`;
    
  
  await customerPage.open();
  await customerPage.firstNameFieldFill(firstName);
  await customerPage.lastNameFieldFill(lastName);
  await customerPage.postCodeFieldFill(postCode);
  await customerPage.AddCustomerButtonClick();
  await page.reload();
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
});

test('Assert manager can add new customer', async ({ page }) => {
    const customerPage = new AddCustomerPage (page);
    const managerMainPage = new BankManagerMainPage (page);
    const listPage = new CustomersListPage (page);
    const accountPage = new OpenAccountPage (page);
    const homePage = new BankHomePage (page);


  await  accountPage.open();
  await accountPage.openAccountButtonClick();
  await accountPage.customerSelecterZoneClick();
  const lastOption = await page.locator('#userSelect option').last().getAttribute('value');
  await accountPage.customerSelecterZone.selectOption(lastOption);
  await accountPage.selectDollarClick();
  await managerMainPage.processButtonClick()
  await page.reload();
  await managerMainPage.customersButtonClick();
  
  
const accountNumberLast = page.getByRole('row', { name: fullName }).getByRole('cell').last();


await expect(accountNumberLast).not.toBeEmpty();



  

  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
});
