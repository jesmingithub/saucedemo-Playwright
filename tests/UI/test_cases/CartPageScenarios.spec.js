import test from "../../../fixtures/fixtures";
const testData = require("../../../data/testdata.json");

test.describe("Cart Page Scenarios", () => {
  test.beforeEach("Login", async ({ loginPage }) => {
    await loginPage.loadURL();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
  });
  /*TC009: View cart with products
	Steps
	Add two products
	Click cart icon
	Expected: Both products displayed in the cart Could you suggest me the logic to do this, not the code. */
  test("TC009 : View cart with products", async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.addSecondItemToCart();
    await inventoryPage.verifyCountWhenSecondItemAdded();
    await cartPage.goToCart();
    await cartPage.verifyItemsDisplayedInCart();
  });
});
