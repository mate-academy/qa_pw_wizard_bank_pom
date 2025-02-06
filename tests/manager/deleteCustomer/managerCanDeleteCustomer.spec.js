import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';


// const addCustomerPage = new AddCustomerPage(page);
// const customersListPage = new CustomersListPage(page);
const fakerFirstName = faker.person.firstName();
// const fakerLastName = faker.person.lastName();
// const fakerPostCode = faker.location.zipCode();
// const bankManagerMainPage = new BankManagerMainPage(page);
// const rowNewUser = expect(page.getByRole('row').filter({ hasText: fakerFirstName }));

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  // const customersListPage = new CustomersListPage(page);
  // const fakerFirstName = faker.person.firstName();
  const fakerLastName = faker.person.lastName();
  const fakerPostCode = faker.location.zipCode();
  // const bankManagerMainPage = new BankManagerMainPage(page);
  // const rowNewUser = expect(page.getByRole('row').filter({ hasText: fakerFirstName }));

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(fakerFirstName);
  await addCustomerPage.fillLastName(fakerLastName);
  await addCustomerPage.fillPostalCode(fakerPostCode);
  await addCustomerPage.clickAddCustomerButton();
  //   const addCustomerPage = new AddCustomerPage(page);
  // const customersListPage = new CustomersListPage(page);
  // const fakerFirstName = faker.person.firstName();
  // const fakerLastName = faker.person.lastName();
  // const fakerPostCode = faker.location.zipCode();
  //   await addCustomerPage.open();
  //   await page.waitForTimeout(1000);
  //   await addCustomerPage.fillFirstName(fakerFirstName);
  //   await addCustomerPage.fillLastName(fakerLastName);
  //   await addCustomerPage.fillPostalCode(fakerPostCode);
  //   await addCustomerPage.clickAddCustomerButton();

  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

});

test('Assert manager can delete customer', async ({ page }) => {
  const bankManagerMainPage = new BankManagerMainPage(page);
  const rowNewUser1 =   page.getByRole('row').filter({hasText: fakerFirstName});
  // const rowNewUser = expect(rowNewUser1).toBeHidden();
  const customersListPage = new CustomersListPage(page);

  // const addCustomerPage = new AddCustomerPage(page);
  // const customersListPage = new CustomersListPage(page);
  // const fakerFirstName = faker.person.firstName();
  // const fakerLastName = faker.person.lastName();
  // const fakerPostCode = faker.location.zipCode();
  // const bankManagerMainPage = new BankManagerMainPage(page);
  // const rowNewUser = expect(page.getByRole('row').filter({ hasText: fakerFirstName }));


  // await addCustomerPage.open();
  // await addCustomerPage.fillFirstName(fakerFirstName);
  // await addCustomerPage.fillLastName(fakerLastName);
  // await addCustomerPage.fillPostalCode(fakerPostCode);
  // await addCustomerPage.clickAddCustomerButton();

  await bankManagerMainPage.clickButtonCustomersLogin();
  await customersListPage.clickDeleteButtonNewUser();
  // await page.waitForTimeout(1000);
  // await customersListPage.assertDeleteRow();
  await expect(rowNewUser1).toBeHidden();
  // await expect(rowNewUser1).toBeVisible();
  // await page.waitForURL('/angularJs-protractor/BankingProject/#/manager/addCust');
  /* 
  Test:
  1. Open Customers page
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */


});