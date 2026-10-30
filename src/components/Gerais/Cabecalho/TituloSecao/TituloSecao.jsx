import './TituloSecao.css'
import '../../../../css/global.css'
import folha from '../../../../img/icones/folhas/varianteUM.svg'
import praiaImagem from '../../../../img/praiaHeader.png'

function TituloSecao({ titulo, subtitulo }) {
    return (
        <div className="containerTitulo liquid">
            <img className='folhaDecoracao' src={folha} alt="" />


            <div className="conteudoTitulo">
                <h1 className='titulo textoGradiente'>{titulo}</h1>
                <h2 className='subTitulo'>{subtitulo}</h2>
            </div>
            <img className='backgroundHeader' src={praiaImagem} alt="" />
        </div>
    );
}

export default TituloSecao;