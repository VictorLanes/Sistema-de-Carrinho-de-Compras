import React, { useState } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

// Dados de login para usuário comum e administrador
const users = {
  user: { username: "user", password: "123!", role: "user" },
  useradm: { username: "useradm", password: "admin123!", role: "admin" }
};

// Definindo os produtos iniciais
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
function ListaProdutos({ produtos, adicionarAoCarrinho }) {
  return (
    <div>
      <h2>Produtos Disponíveis</h2>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - {formatarPreco(produto.preco)}
            <button className="btn" onClick={() => adicionarAoCarrinho(produto)}>Adicionar ao Carrinho</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Componente do carrinho
function Carrinho({ itensCarrinho, removerDoCarrinho, total, finalizarCompra, formaPagamento, setFormaPagamento, role, solicitarAutorizacao }) {
  const handleFormaPagamentoChange = (e) => {
    if (role === "admin") {
      setFormaPagamento(e.target.value);
    } else {
      solicitarAutorizacao(e.target.value); // Solicita autorização e passa o novo método de pagamento
    }
  };

  return (
    <div>
      <h2>Seu Carrinho</h2>
      <ul>
        {itensCarrinho.map((item, index) => (
          <li key={index}>
            {item.nome} - {formatarPreco(item.preco)}
            <button className="btn-remove" onClick={() => removerDoCarrinho(index)}>Remover</button>
          </li>
        ))}
      </ul>
      <h3>Total: {formatarPreco(total)}</h3>

      <div>
        <label>Forma de Pagamento: </label>
        <select value={formaPagamento} onChange={handleFormaPagamentoChange}>
          <option value="credito">Cartão de Crédito</option>
          <option value="boleto">Boleto</option>
          <option value="pix">Pix</option>
          <option value="dinheiro">Dinheiro</option>
        </select>
      </div>

      <button className="btn" onClick={finalizarCompra}>Finalizar Compra</button>
    </div>
  );
}

// Componente do caixa para pagamento em dinheiro
function Caixa({ total, finalizarCompra }) {
  const [valorRecebido, setValorRecebido] = useState(0);
  const troco = valorRecebido - total;

  const handleFinalizar = () => {
    if (valorRecebido >= total) {
      finalizarCompra(valorRecebido, troco);
    } else {
      alert("Valor recebido insuficiente!");
    }
  };

  return (
    <div>
      <h3>Total a pagar: {formatarPreco(total)}</h3>
      <label>Valor Recebido: </label>
      <input
        type="number"
        value={valorRecebido}
        onChange={(e) => setValorRecebido(Number(e.target.value))}
      />
      <h4>Troco: {formatarPreco(troco >= 0 ? troco : 0)}</h4>
      <button className="btn" onClick={handleFinalizar}>Finalizar Compra</button>
    </div>
  );
}

// Componente da Nota Fiscal
function NotaFiscal({ itensCarrinho, total, valorRecebido, troco, voltarAoMenu, voltarAoLogin }) {
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
      <h3>Valor Pago: {formatarPreco(valorRecebido)}</h3>
      <h3>Troco: {formatarPreco(troco)}</h3>
      <button className="btn" onClick={voltarAoMenu}>Voltar ao Menu</button>
      <button className="btn" onClick={voltarAoLogin}>Logout</button> {/* Botão de Logout */}
    </div>
  );
}

// Componente de login para autorização
function LoginModal({ autenticarAdmin, setFormaPagamento, novaFormaPagamento }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "useradm" && password === "admin123!") {
      autenticarAdmin(true);
      setFormaPagamento(novaFormaPagamento); // Salva a nova forma de pagamento após autorização
    } else {
      alert("Credenciais de administrador inválidas!");
      autenticarAdmin(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Autorização Necessária</h2>
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
        <button className="btn" onClick={handleLogin}>Autorizar</button>
      </div>
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
      <button className="btn" onClick={handleLogin}>Login</button>
    </div>
  );
}

// Componente principal do app
function App() {
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [produtos] = useState(dadosProdutosIniciais);
  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState("credito");
  const [novaFormaPagamento, setNovaFormaPagamento] = useState(""); // Variável para salvar a nova forma de pagamento
  const [total, setTotal] = useState(0);
  const [valorRecebido, setValorRecebido] = useState(0);
  const [troco, setTroco] = useState(0);
  const [usuario, setUsuario] = useState(null);
  const [mostrarAutorizacao, setMostrarAutorizacao] = useState(false);
  const [adminAutorizado, setAdminAutorizado] = useState(false);

  const adicionarAoCarrinho = (produto) => {
    setItensCarrinho([...itensCarrinho, produto]);
    setTotal(total + produto.preco);
  };

  const removerDoCarrinho = (index) => {
    const produtoRemovido = itensCarrinho[index];
    const novoCarrinho = itensCarrinho.filter((_, i) => i !== index);
    setItensCarrinho(novoCarrinho);
    setTotal(total - produtoRemovido.preco);
  };

  const finalizarCompra = () => {
    setCompraFinalizada(true);
  };

  const finalizarComDinheiro = (valorRecebido, troco) => {
    setValorRecebido(valorRecebido);
    setTroco(troco);
    setCompraFinalizada(true);
  };

  const voltarAoMenu = () => {
    setItensCarrinho([]);
    setTotal(0);
    setCompraFinalizada(false);
    setFormaPagamento("credito");
  };

  const voltarAoLogin = () => {
    setUsuario(null); // Faz logout
    setItensCarrinho([]); // Limpa o carrinho
    setCompraFinalizada(false); // Reseta o status de finalização de compra
  };

  const autenticarUsuario = (user) => {
    setUsuario(user);
  };

  const solicitarAutorizacao = (novoMetodoPagamento) => {
    setNovaFormaPagamento(novoMetodoPagamento); // Salva a forma de pagamento que o usuário tentou escolher
    setMostrarAutorizacao(true); // Mostra o modal de login do admin
  };

  const autenticarAdmin = (autorizado) => {
    if (autorizado) {
      setAdminAutorizado(true);
      setMostrarAutorizacao(false);
    } else {
      setMostrarAutorizacao(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Sistema de Carrinho de Compras</h1>
      {!usuario ? (
        <Login autenticarUsuario={autenticarUsuario} />
      ) : !compraFinalizada ? (
        <>
          <ListaProdutos produtos={produtos} adicionarAoCarrinho={adicionarAoCarrinho} />
          <Carrinho
            itensCarrinho={itensCarrinho}
            removerDoCarrinho={removerDoCarrinho}
            total={total}
            finalizarCompra={finalizarCompra}
            formaPagamento={formaPagamento}
            setFormaPagamento={setFormaPagamento}
            role={usuario.role}
            solicitarAutorizacao={solicitarAutorizacao}
          />
          {formaPagamento === "dinheiro" && (
            <Caixa total={total} finalizarCompra={finalizarComDinheiro} />
          )}
        </>
      ) : (
        <NotaFiscal
          itensCarrinho={itensCarrinho}
          total={total}
          valorRecebido={valorRecebido}
          troco={troco}
          voltarAoMenu={voltarAoMenu}
          voltarAoLogin={voltarAoLogin} // Passa a função de logout
        />
      )}
      {mostrarAutorizacao && (
        <LoginModal
          autenticarAdmin={autenticarAdmin}
          setFormaPagamento={setFormaPagamento}
          novaFormaPagamento={novaFormaPagamento}
        />
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
