import { useState } from "react";
import "./AcessoRapido.css";
import BotaoAcessoRapido from "./BotaoAcessoRapido/BotaoAcessoRapido";
import fotoFolhas from "../../../img/icones/folhas/varianteDOIS.svg";
import iconePomodoro from "../../../img/icones/acessoRapido/pomodoroRapidoIcone.svg";
import iconeMusicas from "../../../img/icones/acessoRapido/musicaRapidoIcone.svg";
import iconeDiario from "../../../img/icones/acessoRapido/diarioRapidoIcone.svg";
import iconeIdeias from "../../../img/icones/acessoRapido/anotacaoRapidoIcone.svg";
import OpcaoAcessoRapido from "./OpcaoAcessoRapido/OpcaoAcessoRapido";

function AcessoRapido() {
  const [menuAberto, setMenuAberto] = useState(false);

  const alternarMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const AcessoRapidoOpcoes = [
    { id: "pomodoro", nome: "Pomodoro", cor: "#CBE5BD", icone: iconePomodoro, vaiPara: "/pomodoro" },
    { id: "musicas", nome: "Músicas", cor: "#FBE0BC", icone: iconeMusicas, vaiPara: "/musicas" },
    { id: "diario", nome: "Diário", cor: "#C4DDF4", icone: iconeDiario, vaiPara: "/diario" },
    { id: "ideias", nome: "Idéias", cor: "#F1DFF1", icone: iconeIdeias, vaiPara: "/diario" },
  ];

  return (
    <>
      <div 
        className={`overlayAcessoRapido ${menuAberto ? "ativo" : ""}`}
        onClick={alternarMenu}
      ></div>

      <BotaoAcessoRapido aberto={menuAberto} aoClicar={alternarMenu} />
      
      <div className={`containerAcessoRapido liquid ${menuAberto ? "aberto" : ""}`}>
        <header className="cabecalhoAcessoRapido">
          <img src={fotoFolhas} alt="Folhas" />
          <h1 className="textoGradiente">Acesso rápido</h1>
        </header>

        <div className="opcoesAcessoRapido">
          {AcessoRapidoOpcoes.map((item) => (
            <OpcaoAcessoRapido
              key={item.id}
              nome={item.nome}
              icone={item.icone}
              cor={item.cor}
              vaiPara={item.vaiPara}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default AcessoRapido;