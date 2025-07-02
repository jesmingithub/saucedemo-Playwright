import { test as base }  from '@playwright/test'
import Login from '../tests/UI/pages/loginPage'
import Inventory from '../tests/UI/pages/inventoryPage'

const test = base.extend({
	loginPage: async ({ page }, use) => {
		await use(new Login(page))
	},
	inventoryPage: async ({ page }, use) => {
		await use(new Inventory(page))
	}
})

module.exports = test;