const { expect } = require("@playwright/test");
class Inventory {
  constructor(page) {
    this.page = page;
    this.productItems = page.locator(".inventory_item");
    this.sortDropdown = page.getByText("Name (A to Z)Name (A to Z)");
    this.sortProducts = page.locator('[data-test="product-sort-container"]');
    this.productPrices = page.locator(".inventory_item_price");
    this.addToCartButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    );
    this.removeFromCartButton = page.locator(
      '[data-test="remove-sauce-labs-backpack"]'
    );
    this.cartBadge = page.locator(".shopping_cart_badge");
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
    const prodPrices = await this.productPrices.allTextContents();
    const prices = prodPrices.map((price) =>
      parseFloat(price.replace("$", ""))
    );
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  }

  async addItemToCart() {
    await this.addToCartButton.click();
  }

  async removeItemFromCart() {
    await this.removeFromCartButton.click();
  }

  async getItemCount() {
    const isVisible = await this.cartBadge.isVisible();
    if (!isVisible) return 0;

    const countText = await this.cartBadge.textContent();
    return parseInt(countText);
  }
  async verifyCountOnItemAddition() {
    const count = await this.getItemCount();
    expect(count).toBe(1);
  }

  async verifyCountOnItemRemoval() {
    const count = await this.getItemCount();
    expect(count).toBe(0);
  }
}

module.exports = Inventory;
