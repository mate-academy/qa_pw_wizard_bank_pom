import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';


// змінні для збереження даних користувача
let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  
  // створюємо екземпляр класу AddCustomerPage 
  const addCustomerPage = new AddCustomerPage(page);
  
  // генеруємо випадкові дані для користувача
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  // процес створення користувача
  await addCustomerPage.open();
  await addCustomerPage.fillCustomerFirstName(firstName);
  await addCustomerPage.fillCustomerLastName(lastName);
  await addCustomerPage.fillCustomerPostalCode(postalCode);
  await addCustomerPage.clickAddCustomerButtonAndHandleDialog();
  
});

test('Assert manager can delete customer', async ({ page }) => {
  
  // створюємо екземпляр класу CustomersListPage 
  const customersListPage = new CustomersListPage(page);

  // відкриття сторінки
  await customersListPage.open();

  // видалення користувача
  await customersListPage.deleteCustomer(firstName, lastName, postalCode);

  // перевіряємо, що видалений користувач не відображається в таблиці
  await customersListPage.assertCustomerNotPresent(firstName, lastName, postalCode);
  await customersListPage.reload();
  await customersListPage.assertCustomerNotPresent(firstName, lastName, postalCode);

});
