const { expect } = require('@playwright/test');

class Login{

    constructor(page){
        this.page=page;
        this.username = page.locator('[data-test="username"]')
        this.password = page.locator('[data-test="password"]')
        this.loginButton = page.locator('[data-test="login-button"]')
        this.logo = page.getByText('Swag Labs')
        this.locked_outError = page.locator('[data-test="error"]')
        this.invalidUserError = page.locator('[data-test="error"]')
        this.emptyCredentials = page.locator('[data-test="error"]') 
    }

    async loadURL(){
        await this.page.goto("https://www.saucedemo.com/")
    }

    async verifyLoginPageComponents(){
        await expect(this.page).toHaveURL(/www.saucedemo.com/)
        await expect(this.page).toHaveTitle(/.*Swag Labs/)
        await expect(this.logo).toBeVisible()
        await expect(this.username).toBeVisible()
        await expect(this.password).toBeVisible()
    }

    async login(username,password){
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
    }

    async verifyLockOutError(){
        await expect(this.locked_outError).toHaveText(/Sorry, this user has been locked out/i)
    }
    async verifyInvalidUserError(){
        await expect(this.invalidUserError).toHaveText(/Username and password do not match any user in this service/i)
    }
    async verifyEmptyCredentialsError(){
        await expect(this.emptyCredentials).toHaveText(/Username is required/i)
    }

}
module.exports = Login;