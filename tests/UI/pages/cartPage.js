const { expect } = require("@playwright/test");
class Cart {
  constructor(page) {
    this.page = page;
    this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
    this.cartItemNames = page.locator('[data-test="inventory-item"]');
  }
  async goToCart() {
    await this.shoppingCart.click();
    await expect(this.page).toHaveURL(/.*cart/);
  }

  async verifyItemsDisplayedInCart() {
    const ProductNames = ["Sauce Labs Backpack", "Sauce Labs Bike Light"];
    for (const [index, productName] of ProductNames.entries()) {
      const item = this.cartItemNames.nth(index);
      const nameLocator = item.locator(".inventory_item_name");
      await expect(nameLocator).toHaveText(productName);
    }
  }
}
module.exports = Cart;
