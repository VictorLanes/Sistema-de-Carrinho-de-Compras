# Sistema de Carrinho de Compras

Este é um sistema de carrinho de compras simples, desenvolvido em React, que permite adicionar produtos ao carrinho, selecionar um método de pagamento, calcular o troco (em caso de pagamento em dinheiro) e emitir uma nota fiscal fictícia. O sistema é dividido em dois tipos de usuários: **usuário comum** e **administrador**.

## Funcionalidades

- **Login com diferentes permissões**:
  - **Usuário comum**: Apenas pode adicionar produtos ao carrinho, escolher o método de pagamento (com restrições) e finalizar a compra.
  - **Administrador**: Tem permissões totais, podendo alterar o método de pagamento a qualquer momento e autorizar mudanças feitas pelo usuário comum.
- **Adicionar e Remover Produtos do Carrinho**.
- **Seleção de Métodos de Pagamento** (Cartão de Crédito, Boleto, Pix, Dinheiro).
- **Cálculo de troco** em pagamentos com dinheiro.
- **Emissão de Nota Fiscal Fictícia** após a compra.
- **Logout**: Opção para retornar à tela de login.


### Explicações para o Usuário:

1. **Login**: Explica como fazer login tanto como **usuário comum** quanto como **administrador** e o que cada tipo de usuário pode fazer.
2. **Adicionar e Remover Produtos**: Detalha o processo de adicionar produtos ao carrinho e removê-los.
3. **Alterar Método de Pagamento**: Explica como alterar o método de pagamento e o processo de autorização para usuários comuns.
4. **Pagamento em Dinheiro**: Instruções sobre como proceder com pagamentos em dinheiro e o cálculo de troco.
5. **Nota Fiscal**: Explica o conteúdo da nota fiscal que será gerada após a compra.
6. **Logout**: Detalha como o usuário pode sair do sistema.

