import { Given, When, Then } from '../../support'

Given('que esteja na página minha conta', async ({ minhaContaPage }) => {
    await minhaContaPage.visitMinhaConta()
})

When('registro uma nova conta com dados válidos', async ({ minhaContaPage }) => {
    await minhaContaPage.registratConta()
})

Then('valido que fui autenticado e redirecionado para minha conta', async ({ minhaContaPage, header }) => {
    await header.validateUserLogin()
    await minhaContaPage.validarPainelMinhaConta()
})

Given('que eu tenha uma conta cadastrada', async ({ minhaContaPage }) => {
    await minhaContaPage.visitMinhaConta()
    await minhaContaPage.registratConta()
})

Given('esteja deslogado', async ({ header }) => {
    await header.deslogar()
})

When('faço login com credenciais válidas', async ({ minhaContaPage, header}) => {
    await header.clicarLogin()
    await minhaContaPage.fazerLogin()
})