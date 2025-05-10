  const { expect } = require('@playwright/test');

  export class CustomersListPage {
    constructor(page) {
      this.page = page;
      this.searchField = page.getByPlaceholder('Search Customer');
    }

    async open() {
      await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
    }

    async reload () {
      await this.page.reload();
    }

    async waitForLoading () {
      await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
    }

    async locateCustomerRow ( firstName, lastName, postCode) {
      const customerRow = this.page.getByRole('row', {
        name: new RegExp(`${firstName}\\s+${lastName}\\s+${postCode}`, 'i'),
      });
      
      return customerRow;
    }

    async checkCustomerDetails(firstName, lastName, postCode) {
      const customerRowLocator =  await this.locateCustomerRow(firstName, lastName, postCode);

      const customerFirstNameLocator = customerRowLocator.getByRole('cell').nth(0);
      const customerLastNameLocator = customerRowLocator.getByRole('cell').nth(1);
      const customerPostCodeLocator = customerRowLocator.getByRole('cell').nth(2);
      //const customerAccountNumberLocator = customerRowLocator.getByRole('cell').nth(3);
    
      await expect(customerFirstNameLocator).toHaveText(firstName);
      await expect(customerLastNameLocator).toHaveText(lastName);
      await expect(customerPostCodeLocator).toHaveText(postCode);
      //await expect(customerAccountNumberLocator).toHaveText(''); // empty account number

    }

    async deleteCustomer(firstName, lastName, postCode) {
      const customerRowLocator =  await this.locateCustomerRow(firstName, lastName, postCode);
      const deleteCustomerButton = customerRowLocator.getByRole('button');

      await deleteCustomerButton.click();
    }

    async assertCustomerRowVisibility (firstName, lastName, postCode, shouldBeVisible) {
      const customerRowLocator = await this.locateCustomerRow(firstName, lastName, postCode);
      
      if (shouldBeVisible) {
        await expect (customerRowLocator).toBeVisible();
      } else {
        await expect (customerRowLocator).toBeHidden();
      }
    }

    async checkCustomerAccountNumber(firstName, lastName, postCode) {
      const customerRowLocator = await this.locateCustomerRow(firstName, lastName, postCode);
      const customerAccountNumberLocator = customerRowLocator.getByRole('cell').nth(3);
      const accountNumberText = await customerAccountNumberLocator.innerText();
      
      await expect(accountNumberText.trim()).not.toBe('');
    }

    async searchForCustomer (text) {
      await this.searchField.fill(text);
    }

    async assertCustomerRowCount(expectedCount) {
      const rows = await this.page.getByRole('row').all();
      const visibleRows = rows.filter(async (row) => await row.isVisible());
      await expect(visibleRows.length).toBe(expectedCount);
    }
  }