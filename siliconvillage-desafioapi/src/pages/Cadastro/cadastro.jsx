import './cadastro.css'
import { useNavigate } from 'react-router-dom'

function Cadastro() {
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
      nome: form.nome.value,
      cpf: form.cpf.value,
      dataNascimento: form.dataNascimento.value,
      tipoConta: form.tipoConta.value,
      saldo: form.saldo.value,
      limiteSaqueDiario: form.limiteSaqueDiario.value,
      ativa: form.ativo.checked
    };

    await fetch('/api/contas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    navigate('/');
  }

  return (
    <div className='container-cadastro'>
      <form onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        <label htmlFor="nome">Nome</label>
        <input name="nome" type="text" placeholder='Nome' required />

        <label htmlFor="cpf">CPF</label>
        <input name="cpf" type="text" placeholder='CPF' required />

        <label htmlFor="dataNascimento">Data de nascimento</label>
        <input name="dataNascimento" type="date" required />

        <label htmlFor="tipoConta">Tipo de conta</label>
        <select name="tipoConta" required>
          <option value="">Selecione</option>
          <option value="1">Conta corrente</option>
          <option value="2">Conta poupança</option>
        </select>

        <label htmlFor="saldo">Saldo inicial</label>
        <input name="saldo" type="number" placeholder="Saldo inicial" step="0.01" />

        <label htmlFor="limiteSaqueDiario">Limite de saque diário</label>
        <input name="limiteSaqueDiario" type="number" placeholder="Limite de saque diário" required step="0.01" />

        <label htmlFor="ativo" className='checkbox-label'>
          <input id='ativo' type="checkbox" name="ativo" defaultChecked /> Conta ativa
        </label>
        <button type='submit'>Criar conta</button>
        <button type='button' onClick={() => navigate('/')}>Voltar</button>
      </form>
    </div>
  )
}
export default Cadastro