//@ts-check
import { expect } from '@playwright/test'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { parseMoeda } from '../../support/utils'

export class CheckoutPage {

    /**
     * @param {import('@playwright/test').Page} page
     * @param {any} valueData
     */
    constructor(page, valueData) {
        this.page = page
        this.valueData = valueData

        this.nome = page.locator('#billing_first_name')
        this.sobreNome = page.getByRole('textbox', { name: /Sobrenome/ })

        this.comboPais = page.getByRole('combobox', { name: /País/ })
        this.opcaoBrasil = page.locator('.select2-container--open .select2-results__option').filter({ hasText: /^Brasil$/ })

        this.endereco = page.locator('#billing_address_1')
        this.estado = page.getByRole('textbox', { name: /Cidade/ })

        this.comboEstado = page.getByRole('combobox', { name: /Estado/ })
        this.opcaoSp = page.locator('.select2-container--open .select2-results__option').filter({ hasText: /^São Paulo$/ })

        this.cep = page.getByRole('textbox', { name: /CEP/ })
        this.telefone = page.getByRole('textbox', { name: /Telefone/ })
        this.email = page.locator('#billing_email')

        this.criarConta = page.locator('#createaccount')
        this.concordarTermos = page.locator('#terms')
        this.botaoFinalizarCompra = page.locator('#place_order')

        this.produtoResumo = page.locator('td.product-name')
        this.totalResumo = page.locator('td.product-total:has(span)')
        this.subTotal = page.locator('tr.cart-subtotal:has(span)')
        this.total = page.locator('tr.order-total:has(span)')

        this.pedidoRecebido = page.locator('main h1')
        this.totalPedido = page.locator('li.total strong:has(span)')
        this.subTotalDetalhesPedido = page.locator("(//th[text()='Subtotal:']/..//span)[1]")
        this.metodoPagamentoDetalhesPedido = page.locator("//th[text()='Método de pagamento:']/following-sibling::td")
        this.totalDetalhesPedido = page.locator("(//th[text()='Total:']/..//span)[1]")
    }

    async preencherFormulario() {
        const randomNome = faker.person.firstName()
        const randomSobreNome = faker.person.lastName()
        const randomEndereco = faker.location.streetAddress()
        const randomEstado = faker.location.city()
        const randomCep = faker.location.zipCode()
        const randomTelefone = faker.phone.number()
        const randomEmail = faker.internet.email()

        await this.nome.fill(randomNome)
        await this.sobreNome.fill(randomSobreNome)
        await this.comboPais.click()
        await this.opcaoBrasil.click()

        await this.endereco.fill(randomEndereco)
        await this.estado.fill(randomEstado)

        await this.comboEstado.click()
        await this.opcaoSp.click()

        await this.cep.fill(randomCep)
        await this.telefone.fill(randomTelefone)

        await this.email.fill(randomEmail)
    }

    /**
     * @param {string} opcao
     */
    async selecionarMetodoPagamento(opcao) {
        const opcoesValidas = ['Transferência bancária', 'Cheque', 'Pagamento na entrega']
        if (!opcoesValidas.includes(opcao)) {
            throw new Error(`Método de pagamento inválido: ${opcao}`)
        }

        const radio = this.page.getByRole('radio', { name: opcao, exact: true })
        await radio.check()
        await expect(radio, `O método de pagamento ${opcao} deve estar selecionado`).toBeChecked()
        this.valueData.metodoPagamento = opcao
    }

    async concluirCompra() {
        await this.concordarTermos.click()
        await this.botaoFinalizarCompra.click()
    }

    async lerProdutoNoResumo() {
        const texto = await this.produtoResumo.innerText()
        const [nomeCompleto, quantidadeTexto] = texto.split('×').map(t => t.trim())
        const [nomeETamanho, cor] = nomeCompleto.split(',').map(t => t.trim())
        const [nome, tamanho] = nomeETamanho.split('-').map(t => t.trim())

        const textoTotalResumo = await this.totalResumo.innerText()
        const totalResumo = parseMoeda(textoTotalResumo)
        expect(nome, 'O nome do produto no checkout deve ser igual ao do carrinho').toBe(this.valueData.nomeProduto)
        expect(tamanho, 'O tamanho do produto no checkout deve ser igual ao do carrinho').toBe(this.valueData.tamanho)
        expect(cor, 'A cor do produto no checkout deve ser igual a do carrinho').toBe(this.valueData.cor)
        expect(Number(quantidadeTexto), 'A quantidade do produto no checkout deve ser igual a do carrinho').toBe(this.valueData.quantidade)
        expect(totalResumo, 'O total do produto no checkout deve ser igual ao total do carrinho').toBe(this.valueData.totalCarrinho)
    }

    async validarPedidoRecebido() {
        const textoTotalDoPedido = await this.totalPedido.innerText()
        const totalDoPedido = parseMoeda(textoTotalDoPedido)

        await expect(this.pedidoRecebido, 'A pagina de confirmacao deve exibir Pedido recebido').toHaveText('Pedido recebido')
        expect(totalDoPedido, 'O total do pedido recebido deve ser igual ao total do carrinho').toBe(this.valueData.totalCarrinho)

    }

    async validarDetalhesDoPedido() {
        const textoSubtotal = await this.subTotalDetalhesPedido.innerText()
        const metodoPagamento = await this.metodoPagamentoDetalhesPedido.innerText()
        const textoTotal = await this.totalDetalhesPedido.innerText()

        const subtotal = parseMoeda(textoSubtotal)
        const total = parseMoeda(textoTotal)

        expect(subtotal, 'O subtotal nos detalhes do pedido deve ser igual ao subtotal do carrinho').toBe(this.valueData.subtotal)
        expect(metodoPagamento, 'O metodo de pagamento nos detalhes do pedido deve ser igual ao selecionado no checkout').toBe(this.valueData.metodoPagamento)
        expect(total, 'O total nos detalhes do pedido deve ser igual ao total do carrinho').toBe(this.valueData.totalCarrinho)
    }
}