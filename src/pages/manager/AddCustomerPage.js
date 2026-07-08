import { expect } from '@playwright/test'

export class AddCustomerPage {
	constructor(page) {
		this.page = page
		this.addCustomerButton = page
			.getByRole('form')
			.getByRole('button', { name: 'Add Customer' })
		this.lastRow = page.getByRole('row').last()
	}

	async open() {
		await this.page.goto(
			'/angularJs-protractor/BankingProject/#/manager/addCust',
		)
	}

	async waitForOpened() {
		await this.page.waitForURL(
			'/angularJs-protractor/BankingProject/#/manager/addCust',
		)
	}

	async reload() {
		await this.page.reload()
	}

	async clickOnAddCustomerButton() {
		await this.addCustomerButton.click()
	}

	getTextboxLocator(name) {
		return this.page.getByRole('textbox', { name: name })
	}

	async fillTextbox(name, text) {
		await this.getTextboxLocator(name).fill(text)
	}

	getButtonByRole(name) {
		return this.page.getByRole('button', { name: name })
	}

	async clickOnButtonByRole(name) {
		await this.getButtonByRole(name).click()
	}

	getCell(num) {
		return this.lastRow.getByRole('cell').nth(num)
	}

	async assertLastRowCellValue(text, num) {
		await expect(this.getCell(num)).toContainText(text)
	}

	async assertLastRowCellNoValue(num) {
		await expect(this.getCell(num)).toBeEmpty()
	}
}
