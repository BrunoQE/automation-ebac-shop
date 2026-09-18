//@ts-check
import { expect } from '@playwright/test'

export class HomePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page

        this.opcaoHome = page.getByRole('link', { name: 'Home ' })
        this.opcaoComprar = page.getByRole('link', { name: 'Comprar' })
    }

    async visithome() {
        await this.page.goto("/")
        await this.validarQueEstouNaHome()
    }

    async acessarVitrine() {
        await this.opcaoComprar.click()
    }



    async validarQueEstouNaHome() {
        await expect(this.opcaoHome).toBeVisible()
    }


}