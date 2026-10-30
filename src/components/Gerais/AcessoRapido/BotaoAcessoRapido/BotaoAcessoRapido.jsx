import "./BotaoAcessoRapido.css";
import setaAcessoRapido from "../../../../img/icones/setaEsquerdaEscuraIcone.svg";

function BotaoAcessoRapido({ aberto, aoClicar }) {
  return (
    <div 
      className={`containerBotaoAcessoRapido liquid ${aberto ? "ativo" : ""}`}
      onClick={aoClicar}
    >
      <img src={setaAcessoRapido} alt="Seta" />
    </div>
  );
}

export default BotaoAcessoRapido;