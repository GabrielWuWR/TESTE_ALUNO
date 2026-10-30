import React, { useState, useEffect } from "react";
import Icone from "../../Gerais/Icone/Icone";
import "./CardFeedNoticias.css";
import iconeJornal from "../../../img/icones/jornalIcone.svg";
import CardNoticia from "./CardNoticia/CardNoticia";
import iconeSeta from "../../../img/icones/setaAvancarBrancaIcone.svg";

import { obterNoticias } from "../../../js/Rotas_HOME/rotas_HOME.js";

function CardFeedNoticias() {
  const [listaNoticias, setListaNoticias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDados = async () => {
      setCarregando(true);
      const dados = await obterNoticias();
      const umMesAtras = new Date();
      umMesAtras.setMonth(umMesAtras.getMonth() - 1);

      const noticiasRecentes = dados.filter((noticia) => {
        const dataDaNoticia = new Date(noticia.data);
        return dataDaNoticia >= umMesAtras;
      });

      setListaNoticias(noticiasRecentes);
      setCarregando(false);
    };

    buscarDados();
  }, []);

  function irTodasNoticias() {
    alert("Indo para todas as noticias");
  }

  return (
    <div className="containerFeedNoticias liquid">
      <div className="wrapperNoticias">
        <header className="headerFeedNoticias">
          <Icone imagem={iconeJornal} altura={"3rem"} largura={"3rem"} />
          <div className="textosNoticiaHeader">
            <h1 className="textoGradiente">Notícias</h1>
            <p>Novidades para você</p>
          </div>
        </header>

        <div className="containerPreviewNoticia">
          {carregando ? (
            <div className="carregandoNoticias">
              <p>Buscando novidades...</p>
            </div>
          ) : listaNoticias.length > 0 ? (
            listaNoticias.map((noticia) => (
              <CardNoticia key={noticia.id} noticia={noticia} />
            ))
          ) : (
            <div className="semNoticias">
              <p>Nenhuma nova notícia no momento.</p>
            </div>
          )}
        </div>
      </div>

      <div
        className="botaoVerTodasNoticias containerVerde"
        onClick={irTodasNoticias}
      >
        <h1>Ver todas</h1>
        <img src={iconeSeta} alt="Seta Avançar" />
      </div>
    </div>
  );
}

export default CardFeedNoticias;