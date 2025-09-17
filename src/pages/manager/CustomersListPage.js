import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.deleteCustomerButton = page.locator('tbody tr').last().locator('button').filter({hasText:'Delete'})
    this.searchField = page.getByPlaceholder('Search Customer')
    this.allRaws = page.locator('tbody tr')
    this.getCustomerFirstName = page.locator('tbody tr').last().locator('td').first()
    this.getCustomerLastName = page.locator('tbody tr').last().locator('td').nth(1)
    this.getCustomerPostCode = page.locator('tbody tr').last().locator('td').nth(2)
    this.getCustomerNumber = page.locator('tbody tr').last().locator('td').nth(3)
  }

  async openCustomerListPage() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

   async waitCustomerListPage() {
  await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list')
  await expect(this.page.locator('tbody')).toBeVisible()
}

   async clickDeleteCustomerButton () {
    await this.deleteCustomerButton.click()
  }

  async fillSearchField (data) {
   await  this.searchField.fill(data)
  }

 async assertCustomerNumberNotEmpty() {
  const text = await this.getCustomerNumber.textContent()
  expect(text && text.trim().length).toBeGreaterThan(0)
}

  async assertOneRowSearch () {
   await expect(this.page.locator('tbody tr:visible')).toHaveCount(1)
  }

    async elementTextDataEqual (element, text) {
    await expect(element).toHaveText(text)
  }

  async elementTextDataNotEqual (element, text) {
    await expect(element).not.toHaveText(text)
  }

}


