import { test } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage'
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage'

let firstName, lastName, postalCode
test.beforeEach(async ({ page }) => {
	/* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

	const addCustomerPage = new AddCustomerPage(page)
	firstName = faker.person.firstName()
	lastName = faker.person.lastName()
	postalCode = faker.location.zipCode()

	// Open Add Customer page.
	await addCustomerPage.open()

	// Fill the First Name.
	await addCustomerPage.fillTextbox('First Name', firstName)

	// Fill the Last Name.
	await addCustomerPage.fillTextbox('Last Name', lastName)

	// Fill the Postal Code.
	await addCustomerPage.fillTextbox('Post Code', postalCode)

	// Click [Add Customer].
	await addCustomerPage.clickOnAddCustomerButton()
})

test('Assert manager can delete customer', async ({ page }) => {
	/* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */

	const customersListPage = new CustomersListPage(page)

	// Open Customers page.
	await customersListPage.open()

	// Click [Delete] for the row with customer name.
	await customersListPage.clickOnDeleteButton(lastName)

	// Assert customer row is not present in the table.
	await customersListPage.assertCustomerRowNotVisible(lastName)

	// Reload the page.
	await customersListPage.reload()

	// Assert customer row is not present in the table.
	await customersListPage.assertCustomerRowNotVisible(lastName)
})
