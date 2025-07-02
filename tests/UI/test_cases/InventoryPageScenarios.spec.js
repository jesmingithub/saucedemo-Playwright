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
  test("TC_05 :verify product listing", async ({
    loginPage,
    inventoryPage,
  }) => {
    await test.step("Login", async () => {
      await loginPage.loadURL();
      await loginPage.login(
        testData.validUser.username,
        testData.validUser.password
      );
    });
    await test.step("verify product listing", async () => {
      await inventoryPage.verifyProductNamesAndPrices();
    });
  });
});
