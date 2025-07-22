import test from "../../../fixtures/fixtures";
const Inventory = require("../pages/inventoryPage");
const testData = require("../../../data/testdata.json");
const { validUser, lockedOutUser, invalidUser, emptyCredentials } = testData;

test.describe("Positive Login Scenarios", () => {
  /*TC01: Successful login with standard user
      Steps:
    1.Navigate to login page
    2.Verify the Logo, Page Title, Url, UsernameField,PasswordField
    2.Enter username: standard_user
    3.Enter password: secret_sauce
    4.Click Login

Expected Result: User lands on the inventory page
*/
  test("TC_01 : verify successful login to inventory page : @smoke", async ({
    page,
    loginPage,
  }) => {
    await test.step("verify Login Page components ", async () => {
      await loginPage.loadURL();
      await loginPage.verifyLoginPageComponents();
    });

    await test.step("verify successful Login ", async () => {
      await loginPage.login(validUser.username, validUser.password);

      const inventory = new Inventory(page);
      await inventory.verifyInventoryPageUrl();
    });
  });
});
test.describe("Negative Login Scenarios", () => {
  /*TC02: Login with locked-out user

    Steps:
    1.Enter username: locked_out_user
    2.Enter password: secret_sauce
    3.Click Login

    Expected: Error message shown: "Sorry, this user has been locked out."
    */
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.loadURL();
  });

  test("TC_02 : verify login as a locked-out user", async ({ loginPage }) => {
    await loginPage.login(lockedOutUser.username, lockedOutUser.password);
    await loginPage.verifyLockOutError();
  });
  /*TC003: Login with invalid credentials

    Steps:
    1.Navigate to login page
    2.Enter username: invalid_user
    3.Enter password: wrong_password
    4.Click Login

    Expected: Error message shown: "Username and password do not match any user"
    */
  test("TC_03 : verify login with invalid credentials", async ({
    loginPage,
  }) => {
    await loginPage.login(invalidUser.username, invalidUser.password);
    await loginPage.verifyInvalidUserError();
  });
  /*TC004: Login with empty credentials

    Steps:
    1.Navigate to login page
    2.Leave username and password blank
    3.Click Login

    Expected: Error message shown: "Username is required"
    */
  test("TC_04 : verify login with empty credeentials", async ({
    loginPage,
  }) => {
    await loginPage.login(emptyCredentials.username, emptyCredentials.password);
    await loginPage.verifyEmptyCredentialsError();
  });
});
