//@ts-check

export class ComprarPage {

    /**
     * @param {import('@playwright/test').Page} page
     * @param {any} valueData
     */
    constructor(page, valueData) {
        this.page = page
        this.valueData = valueData

        this.primeiroProduto = page.locator('.product:not(.product_cat-uncategorized)').first()
        this.preco = page.locator('.summary .price:has(span)')
        this.tamanho = page.locator(`ul[aria-label=Size] li`).first()
        this.cor = page.locator('ul[aria-label=Color] li').first()
        this.estoque = page.locator('p.stock')
        this.proximoProdutoDireita = page.locator('div.right a:not(.img-link)')
        this.proximoProdutoEsquerda = page.locator('div.left a:not(.img-link)')
        this.nomeProduto = page.locator('div.information h1')
        this.botaoCompraro = page.getByRole('button', { name: 'Comprar' })
        this.quantidade = page.locator("input[type='number']")
        this.botaoVerCarrinho = page.getByRole('link', { name: 'Ver carrinho' })
    }

    async selecionarProduto() {
        await this.primeiroProduto.click()
    }

    /**
     * @param {number} tentativas
     * @returns {Promise<void>}
     */
    async adicionarProdutoAoCarrinho(tentativas = 0) {
        await this.page.waitForLoadState('networkidle')
        if (tentativas >= 5)
            throw new Error('Nenhum produto em estoque encontrado após 5 tentativas')

        await this.tamanho.click()
        await this.cor.click()

        const estoque = await this.estoque.innerText()

        if (estoque === 'Fora de estoque') {
            if (await this.proximoProdutoDireita.count() > 0) {
                await this.page.locator('div.right').hover()
                await this.proximoProdutoDireita.click()
            } else if (await this.proximoProdutoEsquerda.count() > 0) {
                await this.page.locator('div.left').hover()
                await this.proximoProdutoEsquerda.click()
            } else {
                throw new Error('Não há produto anterior nem próximo para tentar')
            }
            
            return this.adicionarProdutoAoCarrinho(tentativas + 1)
        }

        this.valueData.preco = await this.preco.innerText()
        this.valueData.nomeProduto = await this.nomeProduto.innerText()
        this.valueData.tamanho = await this.tamanho.innerText()
        this.valueData.cor = await this.cor.innerText()
        this.valueData.quantidade = await this.quantidade.inputValue()

        await this.botaoCompraro.click()
        await this.botaoVerCarrinho.click()
    }

}