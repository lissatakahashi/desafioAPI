import './VisualizarContas.css'
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom'

function VisualizarContas( { contas } ) {
    const navigate = useNavigate();

    const tipoContaTexto = (n) => {
        if (n === 1) return "Conta corrente";
        if (n === 2) return "Conta poupança";
        return "Tipo desconhecido";
    }

    return (
        <div className='container-visualizar'>
            <h2>Visualizar Contas</h2>
            <div className='cards-lista'>
                {contas.map(user => (
                    <div key={user.idConta} className='card-conta'>
                        <p><strong>Nome:</strong> {user.nome}</p>
                        <p><strong>CPF:</strong> {user.cpf}</p>
                        <p><strong>Tipo de conta:</strong> {tipoContaTexto(user.tipoConta)}</p>
                        <p><strong>Saldo:</strong> R${user.saldo.toFixed(2)}</p>
                        <p><strong>Limite de saque diário:</strong> R${user.limiteSaque.toFixed(2)}</p>
                        <p><strong>Conta ativa:</strong> {user.ativa ? "Sim" : "Não"}</p>
                        <button onClick={() => navigate(`/detalhes/${user.idConta}`)}>Ver detalhes</button>
                    </div>
                ))}
            </div>

        </div>
    )
}

VisualizarContas.propTypes = {
    contas: PropTypes.array.isRequired,
}

export default VisualizarContas