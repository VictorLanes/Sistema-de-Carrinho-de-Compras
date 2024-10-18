# Unicarioca - Desenvolvimento de aplicações móveis
# Nome: Victor Lanes 
# Matrtícula: 2018100887

#  APS - Sistema de Carrinho de Compras

Este projeto implementa um sistema de carrinho de compras com diferentes níveis de permissão para usuários. O sistema permite que administradores (useradm) possam adicionar, editar e excluir produtos, enquanto os usuários comuns (user) podem apenas selecionar itens e finalizar suas compras.

## Funcionalidades

### Administrador (useradm)
- Adicionar novos produtos.
- Editar o nome e o valor dos produtos existentes.
- Excluir produtos da lista.
- Salvar alterações nos produtos.
- Finalizar a compra com um relatório detalhado dos itens.
- Logout para retornar à tela de login.

### Usuário Comum (user)
- Selecionar itens para adicionar ao carrinho.
- Remover itens do carrinho.
- Finalizar a compra com um relatório dos itens escolhidos.
- Logout para retornar à tela de login.

## Como usar

### Credenciais de Login

- **Administrador (useradm):**
  - Usuário: `useradm`
  - Senha: `admin123!`
  
- **Usuário comum (user):**
  - Usuário: `user`
  - Senha: `123!`

### Tela Principal

Na tela principal, os produtos disponíveis são listados. Dependendo do tipo de usuário logado, as funcionalidades disponíveis variam:

- **Administrador** pode adicionar, editar e excluir produtos.
- **Usuário comum** pode selecionar produtos e adicioná-los ao carrinho.

### Carrinho de Compras

Os itens adicionados ao carrinho são exibidos, permitindo que o usuário visualize o total da compra e remova itens indesejados. O usuário pode finalizar a compra e gerar uma nota fiscal com a lista dos produtos comprados.

### Nota Fiscal

Ao finalizar a compra, uma nota fiscal é gerada com o nome e o valor dos produtos escolhidos. Um botão de "Nova Venda" permite que o sistema seja reiniciado para uma nova compra.

### Logout

Ambos os tipos de usuários podem sair do sistema a qualquer momento utilizando o botão de logout, voltando à tela de login.

## Instalação

Este projeto foi criado utilizando React. Para rodar o sistema, basta utilizar um ambiente que suporte React ou incluir o script em um projeto React já existente.

1. Clone o repositório.
2. Instale as dependências necessárias.
3. Execute o projeto em um servidor local.

```bash
npm install
npm start
