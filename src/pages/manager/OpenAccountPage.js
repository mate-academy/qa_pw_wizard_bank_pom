import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyButton = page.getByTestId('currency');
    this.selecterZone = page.locator('#currency');
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customerSelecterZone = page.locator('#userSelect');
    

  }

  async open() {
    await this.page.goto(
      'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }
  async currencyButtonClick(){
    await this.currencyButton.click();
  }
  async selectDollarClick (){
    await this.selecterZone.selectOption('Dollar');
  }
  async assertDollarValue (){
    await expect(this.selecterZone).toHaveValue('Dollar');
  }
  async selectPound (){
    await this.selecterZone.selectOption('Pound');
  }
  async assertPoundValue (){
    await expect(this.selecterZone).toHaveValue('Pound');
  }
  async selectRupee (){
    await this.selecterZone.selectOption('Rupee');
  }
   async assertRupeeValue (){
    await expect(this.selecterZone).toHaveValue('Rupee');
   }
   async openAccountButtonClick(){
    await this.openAccountButton.click();
  
   }
   async customerSelecterZoneClick(){
    await this.customerSelecterZone.click();
   }
   
}
