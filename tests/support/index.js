import { test as base, createBdd } from 'playwright-bdd'

import { MinhaContaPage } from '../pages/minhaConta/MinhaContaPage.js'
import { Header } from '../components/Header.js'
import { HomePage } from '../pages/home/HomePage.js'
import { ComprarPage } from '../pages/comprar/ComprarPage.js'
import { CarrinhoPage } from '../pages/carrinho/CarrinhoPage.js'
import { CheckoutPage } from '../pages/checkout/CheckoutPage.js'


export const test = base.extend({
    userData: async ({ }, use) => {
        await use({
            email: '',
            password: ''
        })
    },
    valueData: async ({ }, use) => {
        await use({
            preco: '',
            nomeProduto: '',
            tamanho: '',
            cor: '',
            totalProduto: '',
            quantidade: '',
            totalCarrinho: '',
            subtotal: '',
            metodoPagamento: ''
        })
    },
    minhaContaPage: async ({ page, userData }, use) => {
        await use(new MinhaContaPage(page, userData))
    },
    header: async ({ page, valueData }, use) => {
        await use(new Header(page, valueData))
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page))
    },
    comprarPage: async ({ page, valueData }, use) => {
        await use(new ComprarPage(page, valueData))
    },
    carrinhoPage: async ({ page, valueData }, use) => {
        await use(new CarrinhoPage(page, valueData))
    },
    checkoutPage: async ({ page, valueData }, use) => {
        await use(new CheckoutPage(page, valueData))
    }
})

export const { Given, When, Then } = createBdd(test)