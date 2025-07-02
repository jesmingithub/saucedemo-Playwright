const { expect } = require('@playwright/test');

class Inventory
{
    constructor(page){
        this.page= page;
    }

    async verifyInventoryPageUrl(){
        await expect(this.page).toHaveURL(/.*inventory/);
    }
}
module.exports = Inventory;