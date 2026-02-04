import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';


// оголошуємо змінні для збереження імені та прізвища користувача
let firstName;
let lastName;
let zipCode;

test.beforeEach(async ({ page }) => {
  
  // створюємо екземпляр класу AddCustomerPage 
  const addCustomerPage = new AddCustomerPage(page);
  
  // генеруємо випадкові дані імені користувача
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  zipCode = faker.location.zipCode();

  // процес створення користувача
  await addCustomerPage.open();
  await addCustomerPage.fillCustomerFirstName(firstName);
  await addCustomerPage.fillCustomerLastName(lastName);
  await addCustomerPage.fillCustomerPostalCode(zipCode);
  await addCustomerPage.assertDialogWindowUserCreated();
  await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can open new account for a customer', async ({ page }) => {
  
  // створюємо екземпляри класів OpenAccountPage та CustomersListPage
  const openAccountPage = new OpenAccountPage(page);
  const customerListPage = new CustomersListPage(page);
  
  // відкриваємо сторінку open account
  await openAccountPage.open();
  
  // відкриваємо аккаунт
  await openAccountPage.selectCustomer(firstName, lastName);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.assertDialogWindowAccountOpen();
  await openAccountPage.clickProcessButton();

  // переходимо на список всіх користувачів
  await customerListPage.open();

  // перевіряємо наявність Account Number у користувача
  await customerListPage.assertCustomerAccountNumber(firstName, lastName, zipCode);

});
