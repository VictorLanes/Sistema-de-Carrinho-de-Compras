import React, { useState } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

// Dados de login para usuário comum e administrador
const users = {
  user: { username: "user", password: "123!", role: "user" },
  useradm: { username: "useradm", password: "admin123!", role: "admin" }
};

// Produtos iniciais
const dadosProdutosIniciais = [
  { id: 1, nome: "Maçã", preco: 1.5 },
  { id: 2, nome: "Banana", preco: 1.0 },
  { id: 3, nome: "Laranja", preco: 2.0 },
  { id: 4, nome: "Leite", preco: 3.0 },
  { id: 5, nome: "Pão", preco: 2.5 }
];

// Função para formatar o preço
function formatarPreco(preco) {
  return `R$ ${preco.toFixed(2)}`;
}

// Componente da lista de produtos
function ListaProdutos({ produtos, adicionarAoCarrinho, role, editarProduto, excluirProduto }) {
  return (
    <div>
      <h2>Produtos Disponíveis</h2>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            {role === "admin" ? (
              <>
                <input
                  type="text"
                  value={produto.nome}
                  onChange={(e) => editarProduto(produto.id, "nome", e.target.value)}
                />
                <input
                  type="number"
                  value={produto.preco}
                  onChange={(e) => editarProduto(produto.id, "preco", Number(e.target.value))}
                />
                <button className="btn" onClick={() => excluirProduto(produto.id)}>Excluir</button>
              </>
            ) : (
              <>
                {produto.nome} - {formatarPreco(produto.preco)}
              </>
            )}
            <button className="btn" onClick={() => adicionarAoCarrinho(produto)}>
              Adicionar ao Carrinho
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Componente para adicionar novos produtos (somente admin)
function AdicionarProduto({ adicionarProduto, role }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0);

  const handleAdicionar = () => {
    if (role === "admin") {
      adicionarProduto({ nome, preco });
      setNome("");
      setPreco(0);
    } else {
      alert("Apenas administradores podem adicionar produtos.");
    }
  };

  return (
    role === "admin" && (
      <div>
        <h2>Adicionar Novo Produto</h2>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
        />
        <button className="btn" onClick={handleAdicionar}>
          Adicionar Produto
        </button>
      </div>
    )
  );
}

// Botão de salvar para o admin
function BotaoSalvar({ salvarAlteracoes, role }) {
  return (
    role === "admin" && (
      <button className="btn" onClick={salvarAlteracoes}>
        Salvar Alterações
      </button>
    )
  );
}

// Botão de logout
function BotaoLogout({ fazerLogout }) {
  return (
    <button className="btn" onClick={fazerLogout}>
      Logout
    </button>
  );
}

// Componente do carrinho
function Carrinho({ itensCarrinho, removerDoCarrinho, total, finalizarCompra, role }) {
  const handleFinalizarCompra = () => {
    finalizarCompra();
  };

  return (
    <div>
      <h2>Seu Carrinho</h2>
      <ul>
        {itensCarrinho.map((item, index) => (
          <li key={index}>
            {item.nome} - {formatarPreco(item.preco)}
            <button className="btn-remove" onClick={() => removerDoCarrinho(index)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <h3>Total: {formatarPreco(total)}</h3>
      <button className="btn" onClick={handleFinalizarCompra}>
        Finalizar Compra
      </button>
    </div>
  );
}

// Componente da Nota Fiscal
function NotaFiscal({ itensCarrinho, total, voltarAoMenu }) {
  return (
    <div>
      <h2>Nota Fiscal</h2>
      <ul>
        {itensCarrinho.map((item, index) => (
          <li key={index}>
            {item.nome} - {formatarPreco(item.preco)}
          </li>
        ))}
      </ul>
      <h3>Total: {formatarPreco(total)}</h3>
      <button className="btn" onClick={voltarAoMenu}>
        Nova Venda
      </button>
    </div>
  );
}

// Componente principal do app
function App() {
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [produtos, setProdutos] = useState(dadosProdutosIniciais);
  const [total, setTotal] = useState(0);
  const [usuario, setUsuario] = useState(null);
  const [compraFinalizada, setCompraFinalizada] = useState(false);

  const adicionarAoCarrinho = (produto) => {
    setItensCarrinho([...itensCarrinho, produto]);
    setTotal(total + produto.preco);
  };

  const adicionarProduto = (novoProduto) => {
    setProdutos([...produtos, { id: produtos.length + 1, ...novoProduto }]);
  };

  const editarProduto = (id, campo, valor) => {
    const novosProdutos = produtos.map((produto) =>
      produto.id === id ? { ...produto, [campo]: valor } : produto
    );
    setProdutos(novosProdutos);
  };

  const excluirProduto = (id) => {
    const novosProdutos = produtos.filter((produto) => produto.id !== id);
    setProdutos(novosProdutos);
  };

  const salvarAlteracoes = () => {
    alert("Alterações salvas com sucesso!");
  };

  const removerDoCarrinho = (index) => {
    const produtoRemovido = itensCarrinho[index];
    const novoCarrinho = itensCarrinho.filter((_, i) => i !== index);
    setItensCarrinho(novoCarrinho);
    setTotal(total - produtoRemovido.preco);
  };

  const finalizarCompra = () => {
    setCompraFinalizada(true); // Marca como finalizada e emite a nota fiscal
  };

  const fazerLogout = () => {
    setUsuario(null); // Faz logout e volta à tela de login
    setItensCarrinho([]); // Limpa o carrinho
    setTotal(0); // Reseta o total
    setCompraFinalizada(false); // Reseta o estado de finalização
  };

  const voltarAoMenu = () => {
    setItensCarrinho([]); // Limpa o carrinho para uma nova venda
    setTotal(0); // Reseta o total
    setCompraFinalizada(false); // Marca como nova venda
  };

  return (
    <div className="app-container">
      <h1>Sistema de Carrinho de Compras</h1>
      {!usuario ? (
        <Login autenticarUsuario={setUsuario} />
      ) : !compraFinalizada ? (
        <>
          <ListaProdutos
            produtos={produtos}
            adicionarAoCarrinho={adicionarAoCarrinho}
            role={usuario.role}
            editarProduto={editarProduto}
            excluirProduto={excluirProduto}
          />
          <AdicionarProduto adicionarProduto={adicionarProduto} role={usuario.role} />
          <Carrinho
            itensCarrinho={itensCarrinho}
            removerDoCarrinho={removerDoCarrinho}
            total={total}
            finalizarCompra={finalizarCompra}
            role={usuario.role}
          />
          <BotaoSalvar salvarAlteracoes={salvarAlteracoes} role={usuario.role} />
          <BotaoLogout fazerLogout={fazerLogout} />
        </>
      ) : (
        <NotaFiscal itensCarrinho={itensCarrinho} total={total} voltarAoMenu={voltarAoMenu} />
      )}
    </div>
  );
}

// Componente de login inicial para autenticação
function Login({ autenticarUsuario }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = users[username];
    if (user && user.password === password) {
      autenticarUsuario(user);
    } else {
      alert("Credenciais inválidas!");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
