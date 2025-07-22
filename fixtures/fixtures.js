import { test as base }  from '@playwright/test'
import Login from '../tests/UI/pages/loginPage'
import Inventory from '../tests/UI/pages/inventoryPage'
import Cart from '../tests/UI/pages/cartPage'

const test = base.extend({
	loginPage: async ({ page }, use) => {
		await use(new Login(page))
	},
	inventoryPage: async ({ page }, use) => {
		await use(new Inventory(page))
	},
	cartPage: async ({ page }, use) => {
		await use(new Cart(page))
	}
})

module.exports = test;