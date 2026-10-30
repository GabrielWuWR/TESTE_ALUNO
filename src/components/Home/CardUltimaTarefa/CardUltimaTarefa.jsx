import React, { useState, useEffect } from "react";
import Icone from "../../Gerais/Icone/Icone";
import "./CardUltimaTarefa.css";
import iconeRepetir from "../../../img/icones/repetirIcone.svg";
import iconePlay from "../../../img/icones/playIcone.svg";
import { useNavigate } from "react-router-dom";
import { obterUltimaAtividade } from "../../../js/Rotas_HOME/rotas_HOME.js";

function CardUltimaTarefa() {
  const navigate = useNavigate();
  const [ultimaTarefa, setUltimaTarefa] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarUltimaAtividade = async () => {
      setCarregando(true);
      const dados = await obterUltimaAtividade();
      setUltimaTarefa(dados);
      setCarregando(false);
    };

    buscarUltimaAtividade();
  }, []);

  function vaiPara() {
    if (ultimaTarefa && ultimaTarefa.vaiPara) {
      navigate(ultimaTarefa.vaiPara);
    }
  }

  if (carregando || !ultimaTarefa) {
    return (
      <div
        className="containerUltimaTarefa liquid"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ color: "var(--cinza)" }}>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="containerUltimaTarefa liquid">
      <header className="cabecalhoUltimaTarefa">
        <Icone imagem={iconeRepetir} largura={"2.8rem"} altura={"2.8rem"} />
        <div className="textosHeaderUltimaTarefa">
          <h1 className="textoGradiente">Volte de onde parou</h1>
          <p>Retome o seu foco.</p>
        </div>
      </header>

      <div className="conteudoUltimaTarefa liquid">
        <Icone
          imagem={ultimaTarefa.imagem}
          altura={"3.7rem"}
          largura={"3.7rem"}
        />

        <div className="textosUltimaTarefa">
          <h1 className="textoGradiente">{ultimaTarefa.nome}</h1>
          <p>{ultimaTarefa.textoUm}</p>
          <p className="ultimoTexto">{ultimaTarefa.textoDois}</p>
        </div>
      </div>

      <div className="botaoUltimaTarefa containerVerde" onClick={vaiPara}>
        <img src={iconePlay} alt="" />
        <h1>Continuar</h1>
      </div>
    </div>
  );
}

export default CardUltimaTarefa;
