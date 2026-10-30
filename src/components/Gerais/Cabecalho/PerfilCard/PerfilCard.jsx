import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PerfilCard.css";
import "../../../../css/global.css";
import Icone from "../../Icone/Icone";
import iconeCalendario from "../../../../img/icones/calendarioIcone.svg";
import iconeRelogio from "../../../../img/icones/relogioIcone.svg";

function Relogio() {
  const [horaAtual, setHoraAtual] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setHoraAtual(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <h1>
      {horaAtual.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </h1>
  );
}

function PerfilCard({ foto }) {
  const navigate = useNavigate();
  const [usuarioSalvo, setUsuarioSalvo] = useState({});

  useEffect(() => {
    try {
      const salvo = localStorage.getItem("usuarioBloom");
      if (salvo) {
        setUsuarioSalvo(JSON.parse(salvo));
      }
    } catch (error) {
      console.error("Erro ao ler usuário:", error);
    }
  }, []);

  const fotoFinal = foto || usuarioSalvo.foto;

  const handleSair = () => {
    localStorage.removeItem("usuarioBloom");
    sessionStorage.removeItem("animacaoHomeTocou");
    sessionStorage.removeItem("dadosHomeCarregados");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const escutarTeclado = (e) => {
      const pressionouAltS = e.altKey && e.key.toLowerCase() === "s";
      const pressionouCmdS = e.metaKey && e.key.toLowerCase() === "s";
  
      if (pressionouAltS || pressionouCmdS) {
        e.preventDefault();
        handleSair();
      }
    };
  
    window.addEventListener("keydown", escutarTeclado);
    return () => window.removeEventListener("keydown", escutarTeclado);
  }, []);
  

  const dataAtual = new Date();
  const dia = String(dataAtual.getDate()).padStart(2, "0");
  const mes = dataAtual
    .toLocaleDateString("pt-BR", { month: "short" })
    .replace(".", "");
  const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1);
  const ano = dataAtual.getFullYear();
  const dataFormatada = `${dia} ${mesCapitalizado} ${ano}`;

  let diaSemana = dataAtual.toLocaleDateString("pt-BR", { weekday: "long" });

  diaSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);

  return (
    <div className="containerPerfil liquid">
      <div className="containerPerfilDados">
        <div className="itemPerfilContainer">
          <Icone
            imagem={iconeCalendario}
            largura={"2.5rem"}
            altura={"2.5rem"}
          />
          <div className="itemPerfil">
            <h1>{dataFormatada}</h1>
            <p>{diaSemana}</p>
          </div>
        </div>
        <div className="itemPerfilContainer hora">
          <Icone imagem={iconeRelogio} largura={"2.5rem"} altura={"2.5rem"} />
          <div className="itemPerfil">
            <Relogio />
          </div>
        </div>
      </div>

      <div className="iconeFotoPerfil liquid" style={{ position: "relative" }}>
        <img
          src={fotoFinal}
          alt="Foto do perfil"
          referrerPolicy="no-referrer"
        />
        <div className="statusUserContainer" style={{ zIndex: 3 }}></div>
      </div>
    </div>
  );
}

export default PerfilCard;
