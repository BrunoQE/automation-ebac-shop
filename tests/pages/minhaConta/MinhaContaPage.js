//@ts-check
import { expect } from "@playwright/test"
import { faker } from "@faker-js/faker"

export class MinhaContaPage {

    /**
     * @param {import("@playwright/test").Page} page
     * @param {any} userData
     */
    constructor(page, userData) {
        this.page = page
        this.userData = userData

        this.registerEmail = page.locator('#reg_email')
        this.registerPassword = page.locator('#reg_password')
        this.register = page.locator('input[name=register]')
        this.myAccount = page.locator("//h1[text()='Minha conta']")
        this.email = page.locator('#username')
        this.password = page.locator('#password')
        this.login = page.locator('input[name=login]')
    }

    async visitMinhaConta() {
        await this.page.goto("/minha-conta")
    }

    async registratConta() {
        const randomEmail = faker.internet.email()
        const randomPassword = `Teste@${Date.now()}Strong!`

        await this.registerEmail.fill(randomEmail)

        await this.registerPassword.click()
        await this.registerPassword.pressSequentially(randomPassword, { delay: 50 })
        await this.register.click()

        this.userData.email = randomEmail
        this.userData.password = randomPassword
    }

    async fazerLogin() {
        await this.email.fill(this.userData.email)
        await this.password.fill(this.userData.password)

        await this.login.click()
    }

    async validarPainelMinhaConta() {
        await expect(this.page.locator('form.register')).toBeHidden()
        await expect(this.myAccount).toHaveText('Minha conta')
    }

}