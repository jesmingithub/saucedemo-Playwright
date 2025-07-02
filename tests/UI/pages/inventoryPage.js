const { expect } = require("@playwright/test");
class Inventory {
  constructor(page) {
    this.page = page;
    this.productItems = page.locator(".inventory_item");
  }

  async verifyInventoryPageUrl() {
    await expect(this.page).toHaveURL(/.*inventory/);
  }

  async verifyProductNamesAndPrices() {
    const Products = [
      { name: "Sauce Labs Backpack", price: "$29.99" },
      { name: "Sauce Labs Bike Light", price: "$9.99" },
      { name: "Sauce Labs Bolt T-Shirt", price: "$15.99" },
      { name: "Sauce Labs Fleece Jacket", price: "$49.99" },
      { name: "Sauce Labs Onesie", price: "$7.99" },
      { name: "Test.allTheThings() T-Shirt (Red)", price: "$15.99" },
    ];

    for (const [index, product] of Products.entries()) {
      const item = this.productItems.nth(index);
      const nameLocator = item.locator(".inventory_item_name");
      const priceLocator = item.locator(".inventory_item_price");

      await expect(nameLocator).toHaveText(product.name);
      await expect(priceLocator).toHaveText(product.price);
    }
  }
}

module.exports = Inventory;
