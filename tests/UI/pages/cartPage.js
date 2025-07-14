const { expect } = require("@playwright/test");
class Cart {
  constructor(page) {
    this.page = page;
    this.cartContentsCount = page.locator("#shoppingcar");
  }
}
