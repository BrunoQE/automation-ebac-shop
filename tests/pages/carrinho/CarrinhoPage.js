//@ts-check
import { expect } from "@playwright/test"
import { parseMoeda } from '../../support/utils.js'



export class CarrinhoPage {

    /**
     * @param {import('@playwright/test').Page} page
     * @param {any} valueData
     */
    constructor(page, valueData) {
        this.page = page
        this.valueData = valueData

        this.preco = page.locator('.product-price:has(span)')
        this.quantidade = page.locator("input[type='number']")
        this.total = page.locator(".product-subtotal:has(span)")
        this.subtotal = page.locator("[data-title='Subtotal']:has(span)")
        this.totalCarrinho = page.locator('tr.order-total td[data-title="Total"]')
        this.botaoConcluirCompra = page.getByRole('link', { name: 'Concluir compra' })
        this.botaoRemoverProduto = page.getByRole('link', { name: 'Remove this item' })
        this.mensagemCarrinhoVazio = page.locator('p.cart-empty')
    }


    async removerProduto() {
        await this.botaoRemoverProduto.click()
    }

    async validarCarrinhoVazio() {
        await expect(this.mensagemCarrinhoVazio, 'O carrinho deve informar que está vazio após remover o produto').toHaveText('Seu carrinho está vazio.')
        await expect(this.botaoRemoverProduto, 'O produto removido não deve continuar no carrinho').toHaveCount(0)
    }
    
    async alterarQuantidade() {
        const quantidadeAnterior = Number(await this.quantidade.inputValue())
        const totalAnterior = await this.total.innerText()

        await this.quantidade.fill(String(quantidadeAnterior + 1))
        await this.quantidade.press('Tab')

        await expect(this.quantidade, 'A quantidade do produto deve aumentar em uma unidade').toHaveValue(String(quantidadeAnterior + 1))
        await expect(this.total, 'O subtotal deve atualizar após mudar a quantidade').not.toHaveText(totalAnterior, { timeout: 20_000 })
    }

    async concluirCompra() {
        await this.botaoConcluirCompra.click()
    }

    async validarPrecoTotal() {
        const preco = await this.preco.innerText()
        const quantidade = await this.quantidade.inputValue()
        const total = await this.total.innerText()
        const subtotal = await this.subtotal.innerText()
        const totalCarrinho = await this.totalCarrinho.innerText()

        const precoNum = parseMoeda(preco)
        const totalNum = parseMoeda(total)
        const subtotalNum = parseMoeda(subtotal)
        const totalCarrinhoNum = parseMoeda(totalCarrinho)

        const resultado = precoNum * Number(quantidade)

        expect(resultado, `${precoNum} x ${quantidade} deveria ser igual ao total ${totalNum}`).toBe(totalNum)
        expect(resultado, `${precoNum} x ${quantidade} deveria ser igual ao subtotal do total do carrinho ${totalNum}`).toBe(subtotalNum)
        expect(resultado, `${precoNum} x ${quantidade} deveria ser igual ao total do total do carrinho ${totalNum}`).toBe(totalCarrinhoNum)

        this.valueData.totalProduto = totalNum
        this.valueData.quantidade = Number(quantidade)
        this.valueData.subtotal = subtotalNum
        this.valueData.totalCarrinho = totalCarrinhoNum
    }


}
