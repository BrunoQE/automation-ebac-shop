## :memo: Descrição
Projeto de automação playwright com cenários Web

## :books: Pré-requisitos
Antes de começar, garanta que os seguintes sistemas estejam instalados em seu computador.

* git (versão 2.49.0)
* Node.js (versão v22.15.0)
* NPM (versão 10.9.2)
* <b>Obs.:</b> Recomendo utilizar as mesmas versões, ou versões mais recentes dos sistemas citados acima.

* <b>Obs. 2:</b> Ao instalar o Node.js o NPM é instalado automaticamente.

* <b>Obs. 3:</b> Para verificar as versões do git, Node.js e NPM instaladas em seu computador, execute os comandos no seu terminal de linha de comando.
```
 git --version
 node --version
 npm --version
```


## Clonando o projeto 🐑
Abra o navegador, acesse a URL https://github.com/BrunoQE/automation-ebac-shop, clique no botão Code, escolha uma opção de clone (HTTPS ou SSH), copie o link de clone do projeto, e em seu terminal de linha de comando (em uma pasta onde você armazene seus projetos de software), execute o comando <b>git clone [cole-o-link-copiado-aqui].</b>

Após o clone do projeto, acesse o diretório recém clonado (ex.: automation-ebac-shop).

Dentro do diretório automation-ebac-shop você terá os sub-diretórios .git/ (diretório oculto), tests/, e os arquivos .gitignore, playwright.config, package-lock.json, package.json, README.md.

## Instalação das dependências de desenvolvimento
Com o projeto clonado a partir do GitHub, é hora de instalarmos suas depedências de desenvolvimento.

Visto que tais dependências já estão listadas no arquivo package.json, basta executar o comando <b>npm install</b> na raiz do projeto e <b>npx playwright install chromium</b> para instalar o Chromium que é necessário para rodar os testes.

## Executando os testes
Estando na raiz do projeto Execute o comando <b>npx bddgen</b> para que o gerador traduza os cenários Gherkin, para arquivos de testes nativos do Playwright.<br> <b>npx playwright test --ui</b> para abrir a interface gráfica do playwright, caso queira rodar no seu terminal de linha de comando basta executar <b>npx playwright test</b>

## Evidencias
No fim da execução dos testes será criado um relatório, basta executar o comando <b>npx playwright show-report</b> para abrir a evidencia e ter os detalhes da automação. 

[Ver resultado da execução: 4 testes aprovados](evidencias/execucao-4-testes.png)

## :wrench: Tecnologias utilizadas
ºNode.js v22.15.0\
ºNPM 10.9.2\
º@playwright/test 1.63.0\
º@types/node 22.20.3\
ºplaywright-bdd 9.2.1\
º@faker-js/faker 10.6.0

## Arquitetura do projeto
```
automation-ebac-shop/
├── playwright.config.js   # Configuração do Playwright e do BDD
├── package.json           # Dependências e comandos
└── tests/
    ├── features/          # Cenários escritos em Gherkin
    ├── steps/             # Implementação dos passos
    ├── pages/             # Page Objects
    ├── components/        # Componentes compartilhados, como Header
    └── support/           # Fixtures e funções utilitárias
```    


## Cenários automatizados

### Compra de produto
O teste acessa a página inicial, escolhe um produto da vitrine, adiciona-o ao carrinho, altera a quantidade e conclui a compra. Confere se quantidade e valores permanecem consistentes no carrinho, no header, no checkout e nos detalhes do pedido.

Escolhi esse cenário porque ele cobre a jornada de compra solicitada no desafio. Uma divergência de valor ou uma falha na finalização impede ou compromete a compra que afeta diretamente a receita da empresa, satisfação e confiança do usuário.

### Adicionar e remover produto do carrinho
O teste adiciona um produto ao carrinho, confirma que a quantidade e o valor aparecem no Header, remove o item e verifica a mensagem de carrinho vazio. Também confere se o contador e o valor no Header voltam a zero.

Escolhi esse cenário porque um cliente que não consegue remover um item indesejado pode abandonar a compra.

### Registro de conta
O teste cadastra um usuário com dados gerados durante a execução e verifica se ele é autenticado e direcionado à página da conta.

Escolhi esse cenário porque o cadastro permite que um novo cliente acesse sua conta e é importante porque o acesso à conta permite consultar os pedidos vinculados a ela.

### Login
O teste cria uma conta, sai dela e entra novamente com as credenciais criadas. Depois verifica se o usuário voltou à página da conta.

Escolhi esse cenário porque clientes já cadastrados precisam conseguir acessar suas contas, isso é importante porque um usuario que comprou um produto, precisa logar para poder acompanhar o pedido ou tomar alguma ação relacionada a mesma. Criar o usuário no próprio teste evita depender de credenciais fixas.

## Cenários não automatizados

Diante do tempo disponível, priorizei a jornada de compra exigida no desafio e as validações de quantidade e valor entre carrinho, checkout e pedido.

- **Adicionar à lista de desejos:** ficou fora do escopo inicial porque não é necessário para concluir a compra. Uma falha afeta a experiência e pode reduzir compras futuras.
- **Buscar produtos:** não foi automatizado nesta entrega. Uma falha dificulta encontrar produtos, especialmente em um catálogo grande, embora ainda seja possível navegar pela loja. Eu avaliaria sua prioridade conforme o uso da busca pelos clientes.


## Investigação: pagamento aprovado, pedido ausente em “Meus Pedidos”

Primeiro, pediria um caso concreto com horário da compra, e-mail ou identificador do usuário e identificador da transação de pagamento. 
Procuraria esses dados nos logs disponíveis e, com apoio do Backend, verificaria se houve erro e se um número de pedido foi gerado. 
Se não houver pedido, investigaria a criação. Se houver, conferiria a qual usuário ele foi associado. Se o pedido estiver associado corretamente,
verificaria a resposta usada por “Meus Pedidos” para descobrir se ele não foi retornado ou se a tela deixou de exibi-lo. 
Depois compararia os casos afetados por forma de pagamento para identificar um possível padrão.
Minha hipótese inicial é que o pedido pode não ter sido criado, pode estar vinculado a outra identidade ou pode estar vinculado mas não estar sendo exibido pela listagem.


## :handshake: Responsavel
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/BrunoQE">
        <img src="https://avatars.githubusercontent.com/u/260292096?s=400&u=1646f68e0e95320cb32a23dad1fba79513093925&v=4"
          width="100px;"
          alt="Foto de Bruno Souza"
          />
          <br>
        <sub>
          <b>Bruno Souza</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## :dart: Status do projeto
* Concluído
