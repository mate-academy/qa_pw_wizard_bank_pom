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

  // створюємо користувача
  await addCustomerPage.open();
  await addCustomerPage.fillCustomerFirstName(firstName);
  await addCustomerPage.fillCustomerLastName(lastName);
  await addCustomerPage.fillCustomerPostalCode(postalCode);
  await addCustomerPage.assertDialogWindowUserCreated();
  await addCustomerPage.clickAddCustomerButton();

});

test('Assert manager can search customer by First Name', async ({ page }) => {
  
  // створюємо екземпляр класу CustomersListPage
  const customerList = new CustomersListPage(page);

  // відкриваємо сторінку із списком кастомерів
  await customerList.open();

  // вводимо ім'я в поле вводу
  await customerList.fillSearchField(firstName);

  // перевіряємо наявність потрібного рядка
  await customerList.assertCustomerPresentInTable(firstName, lastName, postalCode);

  // перевіряємо, що це один рядок у таблиці
  await customerList.assertTableHasOneRow();
});
