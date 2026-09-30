import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

test('Assert manager add customer fields are required', { tag: '@manager' }, async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.assertCustomerFieldsAreRequired();
});

test('Assert manager cannot submit an empty customer form', { tag: '@manager' }, async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.assertEmptyFormSubmissionIsBlocked();
});