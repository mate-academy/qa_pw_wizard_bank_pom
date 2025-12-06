import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ManagerAddCustomerPage } from '../../../src/pages/manager/ManagerAddCustomerPage';
import { ManagerCustomerListPage } from '../../../src/pages/manager/ManagerCustomerListPage';

test('Assert manager can add new customer', async ({ page }) => {
  // Generowanie danych testowych
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  // Inicjalizacja klas POM
  const addCustomerPage = new ManagerAddCustomerPage(page);
  const customerListPage = new ManagerCustomerListPage(page);

  // 1-5. Dodanie nowego klienta
  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomer();

  // 6. Zamknięcie popupu / przeładowanie strony
  await addCustomerPage.reloadPage();

  // 7. Przejście do listy klientów
  await customerListPage.open();

  // 8-11. Asercje dla ostatniego wiersza tabeli
  await customerListPage.assertLastRowContains(firstName);
  await customerListPage.assertLastRowContains(lastName);
  await customerListPage.assertLastRowContains(postCode);
  await customerListPage.assertLastRowNoAccountNumber();
});


