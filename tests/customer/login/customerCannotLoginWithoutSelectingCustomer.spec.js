import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';

test('Assert customer cannot login without selecting a customer', { tag: '@customer' }, async ({
  page,
}) => {
  const customerLoginPage = new CustomerLoginPage(page);

  await customerLoginPage.open();
  await customerLoginPage.assertLoginButtonIsUnavailable();
});