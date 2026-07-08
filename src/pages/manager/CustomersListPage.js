import { expect } from '@playwright/test'

export class CustomersListPage {
	constructor(page) {
		this.page = page
		this.rowLocator = (name) =>
			this.page.getByRole('row').filter({ hasText: name })
		this.deleteButton = this.page.getByRole('button', { name: 'Delete' })
		this.searchField = this.page.getByRole('textbox', {
			name: 'Search Customer',
		})
		this.allRows = this.page.locator('table > tbody > tr')
	}

	async open() {
		await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list')
	}

	async reload() {
		await this.page.reload()
	}

	async clickOnDeleteButton(name) {
		await this.rowLocator(name).locator(this.deleteButton).click()
	}

	async assertCustomerRowNotVisible(name) {
		await expect(this.rowLocator(name)).not.toBeVisible()
	}

	async fillSearchField(text) {
		await this.searchField.fill(text)
	}

	async assertCustomerRowIsVisible(name) {
		await expect(this.rowLocator(name)).toBeVisible()
	}

	async assertOnlyOneRowIsPresent() {
		await expect(this.allRows).toHaveCount(1)
	}
}
