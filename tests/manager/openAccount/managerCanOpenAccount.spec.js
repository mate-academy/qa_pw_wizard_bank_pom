import { test } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage'
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage'

let firstName, lastName, postalCode
test.beforeEach(async ({ page }) => {
	/* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
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

	// Reload the page (This is a simplified step to close the popup).
	await addCustomerPage.reload()
})

test('Assert manager can add new customer', async ({ page }) => {
	const openAccountPage = new OpenAccountPage(page)
	/* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */

	// Click [Open Account].
	await openAccountPage.open()

	// Select Customer name you just created.
	await openAccountPage.selectDropdownElement(
		'userSelect',
		`${firstName} ${lastName}`,
	)
	// Select currency.
	await openAccountPage.selectDropdownElement('currency', 'Dollar')

	// Click [Process].
	await openAccountPage.clickOnButtonByRole('Process')

	// Reload the page (This is a simplified step to close the popup).
	await openAccountPage.reload()

	// Click [Customers].
	await openAccountPage.clickOnButtonByRole('Customers')

	// Assert the customer row has the account number not empty.
	await openAccountPage.assertAccountCellNotEmpty(lastName)
})
