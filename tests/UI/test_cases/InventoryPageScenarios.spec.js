import test from "../../../fixtures/fixtures";
const testData = require("../../../data/testdata.json");

test.describe("Inventory Page Scenarios", () => {
  test.beforeEach("Login", async ({ loginPage }) => {
    await loginPage.loadURL();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
  });
  /*TC005: Verify product listing
    Steps
    1.Login as standard_user
    2.Check product titles and prices displayed
    Expected: All 6 products visible with correct names/prices
  */
  test("TC_05 : verify product listing", async ({ inventoryPage }) => {
    await inventoryPage.verifyProductNamesAndPrices();
  });
  /*TC006: Count the number of products
    Steps
    1. count the number of products
    Expected: Number of products must be displayed as 6
  */
  test("TC_06 : verify product count", async ({ inventoryPage }) => {
    await inventoryPage.verifyProductCount();
  });
  /*TC007: Sort products by price low to high
    Steps
    1.	Select sort option Price (low to high)
    Expected: Products appear sorted correctly
  */
  test("TC_07 : verify sorting products by price", async ({
    inventoryPage,
  }) => {
    await inventoryPage.verifyProductSort();
  });
  /*TC008: Verify the addition and removal of item to the cart
    Steps
    1.	Login as a standard user
    2.add an item to the cart
    3.verify that the item is added
    4.Remove the same object
    5.Verify that the item is removed
    Expected: addition and removal of item to the cart  must be successful
  */
  test("TC_08 : verify addition and removal of items to the cart", async ({
    inventoryPage,
  }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.verifyCountWhenFirstItemAdded();
    await inventoryPage.removeFirstItemFromCart();
    await inventoryPage.verifyCountWhenOnlyItemIsRemoved();
  });
});
