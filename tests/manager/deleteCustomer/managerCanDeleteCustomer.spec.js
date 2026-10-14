import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

let firstName;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
 
  
  firstName = faker.person.firstName(); 
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillField(addCustomerPage.firstName, firstName);
  await addCustomerPage.fillField(addCustomerPage.lastName, lastName);
  await addCustomerPage.fillField(addCustomerPage.postCode, postCode);
  await addCustomerPage.clickButton(addCustomerPage.formButton);
  await addCustomerPage.reloadPage();
  await addCustomerPage.clickButton(addCustomerPage.formButton);
});

test('Assert manager can delete customer', async ({ page }) => {

  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  await customersListPage.deleteCustomar();
  await customersListPage.assertCustomerRowIsNotPresent(firstName);
  await customersListPage.reloadPage();
  await customersListPage.assertCustomerRowIsNotPresent(firstName);


});
