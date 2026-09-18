import { Given, When, Then } from '../../support'


Given('que escolho um produto da vitrine e adiciono ao carrinho', async ({ homePage, comprarPage, header }) => {
    await homePage.visithome()
    await homePage.acessarVitrine()
    await comprarPage.selecionarProduto()
    await comprarPage.adicionarProdutoAoCarrinho()
    await header.validarQuantidadeETotal()
})

When('atualizo a quantidade do item no carrinho', async ({ carrinhoPage }) => {
    await carrinhoPage.alterarQuantidade()
})

Then('o valor total deve refletir a nova quantidade', async ({ carrinhoPage, header }) => {
    await carrinhoPage.validarPrecoTotal()
    await header.validarQuantidadeETotal()
    await carrinhoPage.concluirCompra()
})

When('finalizo a compra com pagamento por {string}', async ({ checkoutPage }, opcao) => {
    await checkoutPage.preencherFormulario()
    await checkoutPage.lerProdutoNoResumo()
    await checkoutPage.selecionarMetodoPagamento(opcao)
    await checkoutPage.concluirCompra()
})

Then('devo receber a confirmação do pedido', async ({ checkoutPage, header }) => {
    await checkoutPage.validarPedidoRecebido()
    await checkoutPage.validarDetalhesDoPedido()
    await header.validarQuantidadeETotalZerou()
})
When('removo o produto do carrinho', async ({ carrinhoPage }) => {
    await carrinhoPage.removerProduto()
})

Then('o carrinho deve ficar vazio', async ({ carrinhoPage, header }) => {
    await carrinhoPage.validarCarrinhoVazio()
    await header.validarQuantidadeETotalZerou()
})
