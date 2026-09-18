Feature: Autenticação de usuário

    Scenario: Registrar conta com sucesso
        Given que esteja na página minha conta
        When registro uma nova conta com dados válidos
        Then valido que fui autenticado e redirecionado para minha conta

    Scenario: Fazer login com sucesso
        Given que eu tenha uma conta cadastrada
        And esteja deslogado
        When faço login com credenciais válidas
        Then valido que fui autenticado e redirecionado para minha conta