import './style.css'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container-home">
      <h1>Sistema de Gestão de Contas</h1>
      <div className="botoes-home">
        <button type='button' className="botao-home" onClick={() => navigate('/visualizar')}>Visualizar contas</button>
        <button type='button' className="botao-home" onClick={() => navigate('/cadastro')}>Criar conta</button>
      </div>
    </div>  
  )
}

export default Home
