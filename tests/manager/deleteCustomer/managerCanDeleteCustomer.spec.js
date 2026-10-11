import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';


let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {

  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();
  
  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomerButton();


});

test('Assert manager can delete customer', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();

  await customersListPage.assertCustomerRowIsPresent(
    firstName,
    lastName,
    postCode,
  );

  await customersListPage.clickDeleteButtonForCustomer(
    firstName,
    lastName,
    postCode,
  );

  await customersListPage.fillSearchField(firstName);

  await customersListPage.assertCustomerRowIsNotPresent(
    firstName,
    lastName,
    postCode,
  );

  await customersListPage.reloadPage();

  await customersListPage.fillSearchField(firstName);

  await customersListPage.assertCustomerRowIsNotPresent(
    firstName,
    lastName,
    postCode,
  );
});