import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customerTable = page.getByRole('table');
    this.searchCustomer = page.getByPlaceholder('Search Customer');
    
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/list',
      { 
        timeout: 5000, // Espera no máximo 5 segundos
        waitUntil: 'load' // Garante que a página disparou o evento de carregamento
      }
    );
  }

  async assertNoRowsIsPresent() {
    // Localiza as linhas de dados dentro do corpo da tabela.
    const rows = this.customerTable.locator('tbody tr');
    // Verifica que há exatamente uma linha após aplicar o filtro.
    await expect(rows).toHaveCount(1);

  }

  async fillSearchCustomerName(firstName){
    await this.searchCustomer.fill(firstName);
  }

  async fillSearchCustomerLastName(lastName){
    await this.searchCustomer.fill(lastName);
  }

  async fillSearchCustomerPostalCode(postalCode){
    await this.searchCustomer.fill(postalCode);
  }

  async assertFirstNameInTable(firstName) {
    const customerRow = this.customerTable
      .getByRole('cell')
      .filter({ hasText: firstName });

    await expect(customerRow).toBeVisible();
  }

  async assertLastCustomer(firstName, lastName, postCode) {
    const lastRow = this.customerTable.getByRole('row').last();
    const cells = lastRow.getByRole('cell');

    await expect(cells.nth(0)).toHaveText(firstName);
    await expect(cells.nth(1)).toHaveText(lastName);
    await expect(cells.nth(2)).toHaveText(postCode);
    await expect(cells.nth(3)).toBeEmpty();
    await expect(cells.nth(4)).toBeVisible('button');
  }

  async deleteCustomer(firstName, lastName, postCode) {
    const customerRow = this.customerTable.getByRole('row').last();
    const cells = customerRow.getByRole('cell');

      await cells.nth(4).getByRole('button', { name: 'Delete' }).click();
  }

  async assertCustomerDeleted(firstName, lastName, postCode) {
  const customerRow = this.customerTable
    .getByRole('row')
    .filter({ hasText: firstName })
    .filter({ hasText: lastName })
    .filter({ hasText: postCode });

      await expect(customerRow).toHaveCount(0);
  }
 
  async assertRowLastCustomerCompleted(firstName, lastName, postCode) {
    const lastRow = this.customerTable.getByRole('row').last();
    const cells = lastRow.getByRole('cell');
    const accountNumberCell = cells.nth(3);

    await expect(cells.nth(0)).toHaveText(firstName);
    await expect(cells.nth(1)).toHaveText(lastName);
    await expect(cells.nth(2)).toHaveText(postCode);
    
    // Verifica que o número da conta na tabela contém apenas dígitos.
    await expect(accountNumberCell).toHaveText(/\S+/);
    
    await expect(cells.nth(4)).toBeVisible('button');
  }

}
