/*TC005: Verify product listing
Steps
Login as standard_user
Check product titles and prices displayed
Expected: All 6 products visible with correct names/prices
*/

import test from "../../../fixtures/fixtures";
const testData = require("../../../data/testdata.json");
const Inventory = require("../pages/inventoryPage");

test.describe("Inventory Page Scenarios", () => {
  test.beforeEach("Login", async ({ loginPage }) => {
    await loginPage.loadURL();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
  });
  test("TC_05:verify product listing", async ({ inventoryPage }) => {
    await inventoryPage.verifyProductNamesAndPrices();
  });
  /*TC006: Count the number of products
    Steps
    1. count the number of products
    Expected: Number of products must be displayed as 6
  */
  test("TC_06:verify product count", async ({ inventoryPage }) => {
    await inventoryPage.verifyProductCount();
  });
  /*TC007: Sort products by price low to high
    Steps
    1.	Select sort option Price (low to high)
    Expected: Products appear sorted correctly
  */
  test("TC_07:verify sorting products by price", async ({ inventoryPage }) => {
    await inventoryPage.verifyProductSort();
  });
});
