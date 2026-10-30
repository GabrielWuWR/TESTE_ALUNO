import "./OpcaoAcessoRapido.css";
import iconeSeta from "../../../../img/icones/setaEsquerdaEscuraIcone.svg"
import { useNavigate } from 'react-router-dom';

function OpcaoAcessoRapido({ nome, cor, icone, vaiPara }) {
    function navegar() {
        alert(`Indo para ${vaiPara}`)
    }
  return (
    <div className="containerOpcao liquid" style={{ "--cor-tema": cor }} onClick={navegar}>
      <div className="iconeOpcaoAcessoRapido">
        <img src={icone} alt={`Icone ${nome}`} />
      </div>
      <h1 className="nomeOpcaoAcessoRapido">{nome}</h1>
      <img className="setaAcessoRapido" src={iconeSeta} alt="" />
    </div>
  );
}

export default OpcaoAcessoRapido;