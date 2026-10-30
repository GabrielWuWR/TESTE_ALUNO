import BotaoSOS from "../Cabecalho/BotaoSOS/BotaoSOS.jsx";
import PerfilCard from "../Cabecalho/PerfilCard/PerfilCard.jsx";
import TituloSecao from "../Cabecalho/TituloSecao/TituloSecao.jsx"
import BotaoVoltar from "./BotaoVoltar/BotaoVoltar.jsx";

import './Cabecalho.css'

function Cabecalho({ titulo = "", subtitulo = "", voltar = false, imagem }) {

    if (voltar == false) {
        return (
            <header className="headerContainer">
                <TituloSecao titulo={titulo} subtitulo={subtitulo} />
                <BotaoSOS />
                <PerfilCard />
            </header>
        )
    } else if (voltar == true) {
        return (
            <header className="headerContainer">
                <div className="containerVoltar">
                    <BotaoVoltar />
                </div>
                <BotaoSOS />
                <PerfilCard foto={imagem}/>
            </header>
        )
    }

}

export default Cabecalho;