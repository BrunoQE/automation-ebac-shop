Feature: Compra de produto

  Scenario: Comprar um produto da vitrine com atualização de quantidade
    Given que escolho um produto da vitrine e adiciono ao carrinho
    When atualizo a quantidade do item no carrinho
    Then o valor total deve refletir a nova quantidade

    When finalizo a compra com pagamento por "Transferência bancária"
    Then devo receber a confirmação do pedido

  Scenario: Adicionar e remover um produto do carrinho
    Given que escolho um produto da vitrine e adiciono ao carrinho
    When removo o produto do carrinho
    Then o carrinho deve ficar vazio
