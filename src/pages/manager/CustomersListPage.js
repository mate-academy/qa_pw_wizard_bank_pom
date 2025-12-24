import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchFunctionality = page.getByPlaceholder('Search Customer');
    this.wholeTable = page.locator('.marTop');
    this.tableRows = page.locator('table tbody tr');
    this.lastRow = page.locator('.marTop').last();
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }


  async clickDeleteButtonByUsername(firstName){
    await this.page
    .getByRole('row', { name: firstName })
    .getByRole('button')
    .click();
  }

 async assertDeletedUserIsNotVisible(firstName){
    const userCell = this.page.getByRole('cell', { name: firstName });
    await expect(userCell).not.toBeVisible();
 }


 async reloadPage(){
  await this.page.reload();
 }



 async searchCustomerByFirstNameFunction(customerFirstName){
  await this.searchFunctionality.fill(customerFirstName);
 }


 async assertUserIsVisible(customerName){
  await expect(this.wholeTable).toContainText(customerName);
 }



 async assertNumberOfRows(expectedCount) {
  await expect(this.tableRows).toHaveCount(expectedCount);
}



 async searchCustomerByLastNameFunction(customerLastName){
  await this.searchFunctionality.fill(customerLastName);
 }



 async searchCustomerByPostalCodeFunction(customerPostalCode){
  await this.searchFunctionality.fill(customerPostalCode);
 }



 async assertLastRow(customerInfo){
  await expect(this.lastRow).toContainText(customerInfo);
 }

 async assertAccountNumberIsEmpty(){
  const accountNumberField = this.page.getByRole('cell').filter({ hasText: /^$/ })
  await expect(accountNumberField).toBeEmpty();
 }


 async assertAccountNumberIsAvailable() {
  // 1. Wybieramy ostatni wiersz (tam jest nasz nowy user)
  const lastRow = this.tableRows.last(); 
  
  // 2. W tym wierszu szukamy komórki z numerem konta (indeks 3, czyli 4. kolumna)
  const accountCell = lastRow.locator('td').nth(3);

  // 3. Sprawdzamy czy NIE jest pusta (bo właśnie założyliśmy konto)
  await expect(accountCell).not.toBeEmpty();
  
  // Opcjonalnie: sprawdź czy to faktycznie numer (minimum 1 cyfra)
  await expect(accountCell).toHaveText(/\d+/);
}
}
