import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cadastro from './pages/Cadastro/cadastro'
import VisualizarContas from './pages/VisualizarContas/VisualizarContas'
import DetalhesConta from './pages/DetalhesConta/DetalhesConta'
import './index.css'

function MainApp() {
  const [contas, setContas] = useState([
    {
      idConta: 1,
      idPessoa: 101,
      nome: "Maria da Silva",
      cpf: "12345678900",
      dataNascimento: "1990-01-15",
      tipoConta: 1,
      saldo: 2000.00,
      limiteSaque: 1000.00,
      ativa: true,
      dataCriacao: "2023-11-10",
    },
    {
      idConta: 2,
      idPessoa: 102,
      nome: "José Souza",
      cpf: "98765432100",
      dataNascimento: "1986-05-30",
      tipoConta: 2,
      saldo: 3500.00,
      limiteSaque: 500.00,
      ativa: false,
      dataCriacao: "2023-11-12",
    },
    {
      idConta: 3,
      idPessoa: 103,
      nome: "Paula Martins",
      cpf: "49358395835",
      dataNascimento: "2000-11-30",
      tipoConta: 1,
      saldo: 500.00,
      limiteSaque: 100.00,
      ativa: true,
      dataCriacao: "2025-04-16",
    },
  ]);

  function depositar(idConta, valor) {
    setContas(prev =>
      prev.map(conta =>
        conta.idConta === idConta
          ? { ...conta, 
              saldo: conta.saldo + Number(valor),
              extrato: [
                ...(conta.extrato || []),
                { tipo: 'depósito', 
                  valor: Number(valor), 
                  data: new Date().toLocaleString() 
                }
              ]
             }
            : conta
      )
    );
  }

  function sacar(idConta, valor) {
    setContas(prev =>
      prev.map(conta =>
        conta.idConta === idConta
          ? { ...conta, 
              saldo: conta.saldo - Number(valor),
            extrato: [
                ...(conta.extrato || []),
                { tipo: 'saque', 
                  valor: Number(valor), 
                  data: new Date().toLocaleString() 
                }
            ] }
          : conta
      )
    );
  }

  function alternarAtivacaoConta(idConta) {
    setContas(prev =>
      prev.map(conta =>
        conta.idConta === idConta
          ? { ...conta, ativa: !conta.ativa }
          : conta
      )
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/visualizar' element={<VisualizarContas contas={contas} />} />
        <Route path='/detalhes/:idConta' element={<DetalhesConta contas={contas} onDepositar={depositar} onSacar={sacar} onBloquear={alternarAtivacaoConta} />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
)