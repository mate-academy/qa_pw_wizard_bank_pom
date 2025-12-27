import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';


test('Assert manager can add new customer', async ({ page }) => {
  
  // створення екземплярів класів
  const addCustomerPage = new AddCustomerPage(page);
  const customerListPage = new CustomersListPage(page);

  // оголошення констант, які зберігають дані імені, прізвища та поштовий індекс
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postalCode = faker.location.zipCode();

  // створюємо кастомера
  await addCustomerPage.open();
  await addCustomerPage.fillCustomerFirstName(firstName);
  await addCustomerPage.fillCustomerLastName(lastName);
  await addCustomerPage.fillCustomerPostalCode(postalCode);
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.reload();

  // переходимо на сторінку всіх кастомерів і перевіряємо чи наш користувач відображається у списку всіх користувачів
  await customerListPage.open();
  await customerListPage.checkFirstName(firstName);
  await customerListPage.checkLastName(lastName);
  await customerListPage.checkPostalCode(postalCode);

});
