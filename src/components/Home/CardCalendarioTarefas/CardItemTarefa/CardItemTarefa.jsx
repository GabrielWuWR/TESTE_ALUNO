import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./CardItemTarefa.css";
import iconeMais from "../../../../img/icones/maisEscuroIcone.svg";
import iconeMenos from "../../../../img/icones/menosEscuroIcone.svg";
import iconeSeta from "../../../../img/icones/setaEsquerdaEscuraIcone.svg";

function CardItemTarefa({
  tarefa,
  onAtualizarTarefa,
  isUnicaTarefa,
  isPrimeira,
  isUltima,
}) {
  const [partes, setPartes] = useState(tarefa.partes);
  const [concluido, setConcluido] = useState(
    tarefa.partes === tarefa.partesTotais,
  );
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    setPartes(tarefa.partes);
    setConcluido(tarefa.partes === tarefa.partesTotais);
  }, [tarefa]);

  const processarAtualizacao = (novasPartes, isConcluindo) => {
    if (isConcluindo !== concluido) {
      setConcluido(isConcluindo);
      setPartes(novasPartes);
      const devePularAnimacao =
        isUnicaTarefa ||
        (isConcluindo && isUltima) ||
        (!isConcluindo && isPrimeira);

      if (devePularAnimacao) {
        onAtualizarTarefa({ ...tarefa, partes: novasPartes });
        return;
      }

      const direcaoAntecipacao = isConcluindo ? -12 : 12;

      setTimeout(() => {
        setOffsetY(direcaoAntecipacao);

        setTimeout(() => {
          setOffsetY(0);
          onAtualizarTarefa({ ...tarefa, partes: novasPartes });
        }, 300);
      }, 400);
    } else {
      setPartes(novasPartes);
      onAtualizarTarefa({ ...tarefa, partes: novasPartes });
    }
  };

  const handleAumentar = () => {
    if (partes < tarefa.partesTotais) {
      const novasPartes = partes + 1;
      processarAtualizacao(novasPartes, novasPartes === tarefa.partesTotais);
    }
  };

  const handleDiminuir = () => {
    if (partes > 0) {
      processarAtualizacao(partes - 1, false);
    }
  };

  const handleToggleCheckbox = (e) => {
    const isChecked = e.target.checked;
    processarAtualizacao(isChecked ? tarefa.partesTotais : 0, isChecked);
  };

  const progresso = (partes / tarefa.partesTotais) * 100;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, y: offsetY }}
      transition={{
        layout: { type: "spring", stiffness: 100, damping: 16 },
        y: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="containerItemTarefa liquid"
    >
      <label className="wrapperCheckbox">
        <input
          className="inputInvisivel"
          type="checkbox"
          checked={concluido}
          onChange={handleToggleCheckbox}
        />
        <div className="boxVirtual">
          <svg className="iconeCheckDesenhado" viewBox="0 0 24 24">
            <path d="M7 13 L10 16 L18 8" />
          </svg>
        </div>
      </label>

      <div className="conteudoTarefa">
        <div className="parteUm">
          <img className="iconeTarefa" src={tarefa.icone} alt="" />
          <p
            className={`tarefaNome ${concluido ? "concluida" : ""}`}
            title={tarefa.nome}
          >
            {tarefa.nome}
          </p>
          <div className="containerControleTarefa">
            <div
              className="botaoControleTarefa liquid"
              onClick={handleAumentar}
            >
              <img src={iconeMais} alt="Adicionar" />
            </div>
            <div
              className="botaoControleTarefa liquid"
              onClick={handleDiminuir}
            >
              <img src={iconeMenos} alt="Remover" />
            </div>
          </div>
        </div>

        <div className="parteDOIS">
          <div className="containerBarraEtapas liquid">
            <div
              className="barraEtapa containerVerdeClaro"
              style={{ width: `${progresso}%` }}
            ></div>
          </div>
          <h1>{`${partes}/${tarefa.partesTotais}`}</h1>
        </div>
      </div>

      <img className="setaTarefa" src={iconeSeta} alt="" />
    </motion.div>
  );
}

export default CardItemTarefa;
