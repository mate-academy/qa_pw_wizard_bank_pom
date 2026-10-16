import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager cannot add duplicate customers', async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFieldFirstName(firstName);
  await addCustomerPage.fillFieldLastName(lastName);
  await addCustomerPage.fillFieldPostalCode(postCode);
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.clickCustomersButton();

  await customersListPage.assertCustomerRowIsVisible(firstName, lastName, postCode);
  await customersListPage.clickAddCustomerButton();

  await addCustomerPage.fillFieldFirstName(firstName);
  await addCustomerPage.fillFieldLastName(lastName);
  await addCustomerPage.fillFieldPostalCode(postCode);
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.assertFieldFirstNameHasValue(firstName);
  await addCustomerPage.assertFieldLastNameHasValue(lastName);
  await addCustomerPage.assertFieldPostalCodeHasValue(postCode);

  await addCustomerPage.clickCustomersButton();

  // On a real project, search by a unique identifier instead.
  await customersListPage.fillSearchField(postCode);
  await customersListPage.assertNoOtherRowIsPresentInTheTable();




});