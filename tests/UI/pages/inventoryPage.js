const { expect } = require("@playwright/test");
class Inventory {
  constructor(page) {
    this.page = page;
    this.productItems = page.locator(".inventory_item");
    this.sortDropdown = page.getByText("Name (A to Z)Name (A to Z)");
    this.sortProducts = page.locator('[data-test="product-sort-container"]');
    this.productPrices = page.locator(".inventory_item_price");
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

  async verifyProductCount() {
    const count = await this.productItems.count();
    expect(count).toBe(6);
  }

  async verifyProductSort() {
    await this.sortDropdown.click();
    await this.sortProducts.selectOption("hilo");
    await this.page.waitForTimeout(500);
    const productPrice = await this.productPrices.allTextContents();
    const prices = productPrice.map((price) =>
      parseFloat(price.replace("$", ""))
    );
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  }
}

module.exports = Inventory;
