import './Icone.css'
import '../../../css/global.css'

/**
 * Insere um icone na tela.
 * 
 * @component
 * @param {string} imagem - Imagem do icone que será inserido.
 * @param {string|number} largura - Largura do Icone (Ex: '25px', '2rem', '30vh').
 * @param {string|number} altura - Altura do Icone (Ex: '25px', '2rem', '30vh').
 * @returns {JSX.Element} Retorna o icone estruturado.
 */

function Icone({ imagem = "", largura= "0px", altura = "0px", className = '' }) {
    return (
        <div
            className={`iconeContainer liquid ${className}`}
            style={{ width: largura, height: altura }}
        >
            <div className="conteudoIcone containerVerde">
                <img src={imagem} alt="" />
            </div>
        </div>
    );
}

export default Icone;