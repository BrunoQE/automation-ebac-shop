//@ts-check
import { expect } from '@playwright/test'
import { parseMoeda } from '../support/utils'

export class Header {

    /**
     * @param {import('@playwright/test').Page} page
     * @param {any} [valueData]
     */
    constructor(page, valueData) {
        this.page = page
        this.valueData = valueData

        this.welcome = this.page.locator('span[class="hidden-xs"]')
        this.logout = this.page.getByRole('link', { name: 'Logout' })
        this.login = this.page.locator(".pull-right a[title='Login']")
        this.cart = this.page.locator("span.sub-title:has(span)")
        this.quantidadeItensCarrinho = this.page.locator("a [class='mini-cart-items']")
    }

    async clicarLogin() {
        await this.login.click()
    }

    async deslogar() {
        await this.logout.click()
    }

    async validateUserLogin() {
        await expect(this.welcome).toContainText('Welcome')
    }

    async validarQuantidadeETotal() {
        const textoCart = await this.cart.innerText()
        const textoValor = textoCart.match(/R\$\s*[\d.,]+/)?.[0]

        const quantidade = Number(await this.quantidadeItensCarrinho.innerText())
        const valorEsperado = this.valueData.totalCarrinho || parseMoeda(this.valueData.preco)

        const valorNoHeader = parseMoeda(textoValor)

        expect(valorNoHeader, 'O valor no header deve refletir o valor validado no carrinho').toBe(valorEsperado)
        expect(quantidade, 'A quantidade no header deve refletir a quantidade do carrinho').toBe(Number(this.valueData.quantidade))
    }

    async validarQuantidadeETotalZerou() {
        await expect(this.cart, 'O valor do carrinho no header deve ser zero').toContainText('R$0,00')
        await expect(this.quantidadeItensCarrinho, 'A quantidade de itens no header deve ser zero').toHaveText('0')
    }

}