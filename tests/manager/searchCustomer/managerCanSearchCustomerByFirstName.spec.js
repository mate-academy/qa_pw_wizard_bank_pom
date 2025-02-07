import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';



const fakerFirstName = faker.person.firstName();
const fakerLastName = faker.person.lastName();
const fakerPostCode = faker.location.zipCode();


test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(fakerFirstName);
  await addCustomerPage.fillLastName(fakerLastName);
  await addCustomerPage.fillPostalCode(fakerPostCode);
  await addCustomerPage.clickAddCustomerButton();
  await page.reload();
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
 
//  firstName = faker.person.firstName();
//  lastName = faker.person.lastName();
//  postalCode = faker.location.zipCode(); 
 
 
});
// let firstName;
// let lastName;
// let postalCode; 

test('Assert manager can search customer by First Name', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  await customersListPage.searchRowFill(fakerFirstName);
  await customersListPage.assertCoctumerRowDisplayed(fakerFirstName);
  await customersListPage.assertAnotherRowAbsented();
  await page.waitForTimeout(1000);
/* 
Test:
1. Open Customers page
2. Fill the firstName to the search field
3. Assert customer row is present in the table. 

4. Assert no other rows is present in the table.
*/


});