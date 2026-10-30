import { useNavigate } from 'react-router-dom';
import './BotaoVoltar.css'
import '../../../../css/global.css'
import seta from '../../../../img/icones/setaEsquerdaIcone.svg'
import Icone from '../../Icone/Icone';
import imagem from '../../../../img/plantasVoltar.png'

function BotaoVoltar() {
    const navigate = useNavigate();

    const voltar = () => {
        navigate(-1);
    };

    return (
        <div className="containerBotaoVoltar liquid" onClick={voltar}>
            <Icone className="seta" imagem={seta} largura={'3rem'} altura={'3rem'} />
            <h1>Voltar</h1>
            <img className='fundoVoltar' src={imagem} alt="" />
        </div>
    )
}

export default BotaoVoltar;