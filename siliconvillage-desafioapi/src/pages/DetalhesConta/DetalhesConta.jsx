import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from 'react-router-dom';
import './DetalhesConta.css'

function DetalhesConta({ contas, onDepositar, onSacar, onBloquear }) {
  const { idConta } = useParams();
  const navigate = useNavigate();
  const conta = contas.find(conta => conta.idConta === Number(idConta));

  const [mostrarDeposito, setMostrarDeposito] = useState(false);
  const [valor, setValor] = useState("");
  const [erro, setErro] = useState("");

  // Estado e modal para sacar:
  const [mostrarSaque, setMostrarSaque] = useState(false);
  const [valorSaque, setValorSaque] = useState("");
  const [erroSaque, setErroSaque] = useState("");

  const [mostrarExtrato, setMostrarExtrato] = useState(false);

  if (!conta) return <div>Conta não encontrada.</div>;

  function handleDeposito() {
    if (!valor || isNaN(valor) || Number(valor) <= 0) {
      setErro("Por favor, insira um valor válido para depósito.");
      return;
    }
    setErro("");
    onDepositar(conta.idConta, Number(valor));
    setValor("");
    setMostrarDeposito(false);
  }

  function handleSaque() {
    const valor = Number(valorSaque);
    if (!valorSaque || isNaN(valor) || valor <= 0) {
      setErroSaque("Por favor, insira um valor válido para saque.");
      return;
    }
    if (valor > conta.saldo) {
      setErroSaque("Saldo insuficiente.");
      return;
    }
    if (valor > conta.limiteSaque) {
      setErroSaque("Valor excede o limite de saque diário.");
      return;
    }
    setErroSaque("");
    onSacar(conta.idConta, valor);
    setValorSaque("");
    setMostrarSaque(false);
  }

  const tipoContaTexto = n => (n === 1 ? "Conta corrente" : n === 2 ? "Conta poupança" : "Tipo desconhecido");

  return (
    <div className='container-detalhes'>
      <h2>Detalhes da Conta</h2>
      <div className='detalhes-card'>
        <p><strong>ID da conta:</strong> {conta.idConta}</p>
        <p><strong>ID da pessoa:</strong> {conta.idPessoa}</p>
        <p><strong>Nome:</strong> {conta.nome}</p>
        <p><strong>CPF:</strong> {conta.cpf}</p>
        <p><strong>Data de nascimento:</strong> {conta.dataNascimento}</p>
        <p><strong>Tipo de conta:</strong> {tipoContaTexto(conta.tipoConta)}</p>
        <p><strong>Saldo:</strong> R${conta.saldo.toFixed(2)}</p>
        <p><strong>Limite de saque diário:</strong> R${conta.limiteSaque.toFixed(2)}</p>
        <p><strong>Conta ativa:</strong> {conta.ativa ? "Sim" : "Não"}</p>
        <p><strong>Data de criação:</strong> {conta.dataCriacao}</p>
      </div>
      <div className="botoes-detalhes">
        <button onClick={() => setMostrarDeposito(true)} disabled={!conta.ativa}>Depositar</button>

        <button onClick={() => setMostrarSaque(true)} disabled={!conta.ativa}>Sacar</button>

        <button onClick={() => onBloquear(conta.idConta)}>{conta.ativa ? "Bloquear" : "Desbloquear"}</button>

        <button onClick={() => setMostrarExtrato(true)}>Visualizar extrato</button>

        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>

      {mostrarDeposito && (
        <div className="modal-deposito">
          <div className="modal-conteudo">
            <input
              type="number"
              placeholder="Valor do depósito"
              value={valor}
              step="0.01"
              onChange={e => setValor(e.target.value)}
            />
            <button onClick={handleDeposito}>Confirmar</button>
            <button onClick={() => { setMostrarDeposito(false); setValor(""); setErro(""); }}>Cancelar</button>
            {erro && <span style={{ color: 'red', marginLeft: "12px" }}>{erro}</span>}
          </div>
        </div>
      )}

      {mostrarSaque && (
        <div className="modal-saque">
          <input
            type="number"
            placeholder="Valor do saque"
            value={valorSaque}
            step="0.01"
            max={conta.limiteSaque}
            onChange={e => setValorSaque(e.target.value)}
          />
          <button onClick={handleSaque}>Confirmar</button>
          <button onClick={() => { setMostrarSaque(false); setValorSaque(""); setErroSaque(""); }}>Cancelar</button>
          {erroSaque && <span style={{ color: 'red', marginLeft: "12px" }}>{erroSaque}</span>}
        </div>
      )}

      {!conta.ativa && (
        <p className="aviso-bloqueada" style={{color: "red", fontWeight: "bold"}}>Conta bloqueada. As operações financeiras estão indisponíveis no momento.</p>
      )}

      {mostrarExtrato && (
        <div className="modal-extrato">
          <div className="modal-conteudo-extrato">
            <h3>Extrato da Conta</h3>
            {conta.extrato && conta.extrato.length > 0 ? (
              <ul>
                {conta.extrato.map((mov, i) => (
                  <li key={i}>
                    {mov.data} - {mov.tipo}: R${mov.valor.toFixed(2)}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Não há movimentações no extrato.</p>
            )}
            <button onClick={() => setMostrarExtrato(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

DetalhesConta.propTypes = {
  contas: PropTypes.isRequired,
  onDepositar: PropTypes.func.isRequired,
  onSacar: PropTypes.func.isRequired,
  onBloquear: PropTypes.func.isRequired,
};

export default DetalhesConta