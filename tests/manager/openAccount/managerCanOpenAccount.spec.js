import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';


// оголошуємо змінні для збереження імені та прізвища користувача
let firstName;
let lastName;

test.beforeEach(async ({ page }) => {
  
  // створюємо екземпляр класу AddCustomerPage 
  const addCustomerPage = new AddCustomerPage(page);
  
  // генеруємо випадкові дані імені користувача
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();

  // процес створення користувача
  await addCustomerPage.open();
  await addCustomerPage.fillCustomerFirstName(firstName);
  await addCustomerPage.fillCustomerLastName(lastName);
  await addCustomerPage.fillCustomerPostalCode(faker.location.zipCode());
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.reload();

});

test('Assert manager can add new customer', async ({ page }) => {
  
  // створюємо екземпляри класів OpenAccountPage та CustomersListPage
  const openAccountPage = new OpenAccountPage(page);
  const customerListPage = new CustomersListPage(page);
  
  // відкриваємо сторінку open account
  await openAccountPage.open();
  
  // відкриваємо аккаунт
  await openAccountPage.selectCustomer(firstName, lastName);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();
  await openAccountPage.reload();

  // переходимо на список всіх користувачів
  await customerListPage.open();

  // перевіряємо наявність Account Number у користувача
  await customerListPage.assertCustomerAccountNumber();

});
