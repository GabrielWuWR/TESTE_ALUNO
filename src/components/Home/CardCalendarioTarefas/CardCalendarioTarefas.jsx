import React, { useState, useEffect } from "react";
import Icone from "../../Gerais/Icone/Icone";
import "./CardCalendarioTarefas.css";
import iconeCalendario from "../../../img/icones/calendarioIcone.svg";
import iconeSeta from "../../../img/icones/setaEsquerdaEscuraIcone.svg";
import iconeTarefa from "../../../img/icones/tarefasIcone.svg";
import iconeMais from "../../../img/icones/maisIconeBranco.svg";
import CardItemTarefa from "./CardItemTarefa/CardItemTarefa";

import { obterTodasAsTarefas } from "../../../js/Rotas_HOME/rotas_HOME.js";

function CardCalendarioTarefas() {
  const dataAtual = new Date();

  const [dataSelecionada, setDataSelecionada] = useState(dataAtual);
  const [dataSaindo, setDataSaindo] = useState(null);
  const [dataVisualizacao, setDataVisualizacao] = useState(dataAtual);
  const [direcaoAnimacao, setDirecaoAnimacao] = useState("avancar");

  const [listaTarefas, setListaTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDados = async () => {
      setCarregando(true);
      const dados = await obterTodasAsTarefas();
      setListaTarefas(dados);
      setCarregando(false);
    };

    buscarDados();
  }, []);

  const diasSemanaLetras = ["D", "S", "T", "Q", "Q", "S", "S"];
  const mesesNomes = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const diasSemanaNomes = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const atualizarTarefa = (tarefaAtualizada) => {
    const atualizarEstado = () => {
      setListaTarefas((prev) =>
        prev.map((t) => (t.id === tarefaAtualizada.id ? tarefaAtualizada : t)),
      );
    };

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        atualizarEstado();
      });
    } else {
      atualizarEstado();
    }
  };

  const parseDataLocal = (dataString) => {
    const [ano, mes, dia] = dataString.split("-");
    return new Date(ano, mes - 1, dia);
  };

  const isMesmoDia = (data1, data2) => {
    return (
      data1.getDate() === data2.getDate() &&
      data1.getMonth() === data2.getMonth() &&
      data1.getFullYear() === data2.getFullYear()
    );
  };

  const tarefasDoDiaSelecionado = listaTarefas
    .filter((t) => isMesmoDia(parseDataLocal(t.data), dataSelecionada))
    .sort((a, b) => {
      const aConcluida = a.partes === a.partesTotais;
      const bConcluida = b.partes === b.partesTotais;
      if (aConcluida !== bConcluida) {
        return aConcluida ? 1 : -1;
      }
      return b.partes - a.partes;
    });

  const selecionarNovoDia = (novaData, direcao = null) => {
    if (novaData.getTime() === dataSelecionada.getTime()) return;
    setDataSaindo(dataSelecionada);
    setDataSelecionada(novaData);

    if (novaData.getMonth() !== dataVisualizacao.getMonth()) {
      setDirecaoAnimacao(
        direcao ? direcao : novaData > dataVisualizacao ? "avancar" : "voltar",
      );
      setDataVisualizacao(
        new Date(novaData.getFullYear(), novaData.getMonth(), 1),
      );
    }

    setTimeout(() => setDataSaindo(null), 200);
  };

  const pularParaDiaComTarefa = (direcao) => {
    const atualTime = new Date(
      dataSelecionada.getFullYear(),
      dataSelecionada.getMonth(),
      dataSelecionada.getDate(),
    ).getTime();

    const datasComTarefa = [...new Set(listaTarefas.map((t) => t.data))]
      .map(parseDataLocal)
      .sort((a, b) => a.getTime() - b.getTime());

    if (direcao === 1) {
      const proximaData = datasComTarefa.find((d) => d.getTime() > atualTime);
      if (proximaData) selecionarNovoDia(proximaData, "avancar");
    } else {
      const datasAnteriores = datasComTarefa.filter(
        (d) => d.getTime() < atualTime,
      );
      if (datasAnteriores.length > 0) {
        selecionarNovoDia(
          datasAnteriores[datasAnteriores.length - 1],
          "voltar",
        );
      }
    }
  };

  const mudarMes = (meses) => {
    setDirecaoAnimacao(meses > 0 ? "avancar" : "voltar");

    const novaData = new Date(
      dataVisualizacao.getFullYear(),
      dataVisualizacao.getMonth() + meses,
      1,
    );

    setDataVisualizacao(novaData);

    const tarefasDoMes = listaTarefas
      .filter((tarefa) => {
        const dataTarefa = parseDataLocal(tarefa.data);

        return (
          dataTarefa.getFullYear() === novaData.getFullYear() &&
          dataTarefa.getMonth() === novaData.getMonth()
        );
      })
      .sort((a, b) => parseDataLocal(a.data) - parseDataLocal(b.data));

    if (tarefasDoMes.length > 0) {
      selecionarNovoDia(
        parseDataLocal(tarefasDoMes[0].data),
        meses > 0 ? "avancar" : "voltar",
      );
    } else {
      selecionarNovoDia(novaData, meses > 0 ? "avancar" : "voltar");
    }
  };

  const gerarDiasDoMes = () => {
    const ano = dataVisualizacao.getFullYear();
    const mes = dataVisualizacao.getMonth();
    const primeiroDiaDoMes = new Date(ano, mes, 1);
    const ultimoDiaDoMes = new Date(ano, mes + 1, 0);
    const dias = [];
    const ultimoDiaMesAnterior = new Date(ano, mes, 0).getDate();

    for (let i = primeiroDiaDoMes.getDay() - 1; i >= 0; i--) {
      dias.push({
        dia: ultimoDiaMesAnterior - i,
        atual: false,
        data: new Date(ano, mes - 1, ultimoDiaMesAnterior - i),
      });
    }
    for (let i = 1; i <= ultimoDiaDoMes.getDate(); i++) {
      dias.push({ dia: i, atual: true, data: new Date(ano, mes, i) });
    }
    const totalSlots = Math.ceil(dias.length / 7) * 7;
    const vagasRestantes = totalSlots - dias.length;
    for (let i = 1; i <= vagasRestantes; i++) {
      dias.push({ dia: i, atual: false, data: new Date(ano, mes + 1, i) });
    }
    return dias;
  };

  const dataHoje = new Date();
  const hasTarefa = (dataGrid) =>
    listaTarefas.some((t) => isMesmoDia(parseDataLocal(t.data), dataGrid));

  const textoDiaFormatado = `${diasSemanaNomes[dataSelecionada.getDay()]}, ${String(dataSelecionada.getDate()).padStart(2, "0")} ${mesesNomes[dataSelecionada.getMonth()].substring(0, 3)}`;
  const textoMesFormatado = `${mesesNomes[dataVisualizacao.getMonth()]} ${dataVisualizacao.getFullYear()}`;

  return (
    <div className="containerCalendarioTarefas liquid">
      <header className="headerCalendarioTarefas">
        <div className="headerUM">
          <Icone
            imagem={iconeCalendario}
            largura={"3.5rem"}
            altura={"3.5rem"}
          />
          <div className="headerTextos">
            <h1 className="textoGradiente">Meu dia</h1>
            <p>Veja suas tarefas do dia.</p>
          </div>
        </div>
        <div className="containerControleTarefas liquid">
          <div
            className="botaoMudarDiaTarefa liquid"
            onClick={() => pularParaDiaComTarefa(-1)}
          >
            <img src={iconeSeta} alt="Dia anterior com tarefa" />
          </div>
          <h1 className="diaTarefa">{textoDiaFormatado}</h1>
          <div
            className="botaoMudarDiaTarefa avancar liquid"
            onClick={() => pularParaDiaComTarefa(1)}
          >
            <img src={iconeSeta} alt="Próximo dia com tarefa" />
          </div>
        </div>
      </header>

      <div className="containerDadosCalendario">
        <div className="containerCalendario liquid">
          <header className="headerCalendario liquid">
            <div className="botaoMudarDia liquid" onClick={() => mudarMes(-1)}>
              <img src={iconeSeta} alt="Mês anterior" />
            </div>
            <h1 className="mesCalendario">{textoMesFormatado}</h1>
            <div
              className="botaoMudarDia voltar liquid"
              onClick={() => mudarMes(1)}
            >
              <img src={iconeSeta} alt="Próximo mês" />
            </div>
          </header>
          <div className="containerDias">
            <div className="gradeDiasSemana">
              {diasSemanaLetras.map((letra, i) => (
                <span key={i} className="letraSemana">
                  {letra}
                </span>
              ))}
            </div>
            <div
              className={`gradeDias slide-${direcaoAnimacao}`}
              key={`${dataVisualizacao.getFullYear()}-${dataVisualizacao.getMonth()}`}
            >
              {gerarDiasDoMes().map((item, index) => (
                <div
                  key={index}
                  onClick={() => selecionarNovoDia(item.data)}
                  className={`diaCalendario ${item.atual ? "mesAtual" : "mesOutro"} ${isMesmoDia(item.data, dataSelecionada) ? "selecionado" : ""} ${dataSaindo && isMesmoDia(item.data, dataSaindo) ? "saindo" : ""} ${isMesmoDia(item.data, dataHoje) ? "hoje" : ""}`}
                >
                  {item.dia}
                  {hasTarefa(item.data) && (
                    <span className="indicadorTarefa"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="containerTarefas">
          <header className="headerTarefasCalendario">
            <div className="parteUm">
              <Icone imagem={iconeTarefa} largura={"3rem"} altura={"3rem"} />
              <h1>Tarefas do dia</h1>
            </div>
            <div className="botaoNovaTarefa containerVerde">
              <p>Nova tarefa</p>
              <img src={iconeMais} alt="" />
            </div>
          </header>

          <div className="containerListaTarefas scroll-liquid">
            {carregando ? (
              <div className="semTarefasMensagem">
                <p>Carregando tarefas...</p>
              </div>
            ) : tarefasDoDiaSelecionado.length > 0 ? (
              tarefasDoDiaSelecionado.map((tarefa, index) => (
                <CardItemTarefa
                  key={tarefa.id}
                  tarefa={tarefa}
                  onAtualizarTarefa={atualizarTarefa}
                  isUnicaTarefa={tarefasDoDiaSelecionado.length === 1}
                  isPrimeira={index === 0}
                  isUltima={index === tarefasDoDiaSelecionado.length - 1}
                />
              ))
            ) : (
              <div className="semTarefasMensagem">
                <p>Nenhuma tarefa neste dia.</p>
                <span>Aproveite o tempo livre!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardCalendarioTarefas;
