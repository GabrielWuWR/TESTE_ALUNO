import { useState, useEffect } from "react";
import "./CardMomentoBloom.css";
import folhasMomentoBloom from "../../../img/icones/folhas/varianteDOIS.svg";
import bolhaMensagem from "../../../img/icones/bolhaMensagemIcone.svg";
import setaMensagem from "../../../img/icones/setaAvancarBrancaIcone.svg";
import folhasFundo from "../../../img/plantasMomentoBloom.png";
import { obterFraseAleatoria } from "../../../js/Rotas_HOME/rotas_HOME.js";

function CardMomentoBloom() {
  const [fraseCompleta, setFraseCompleta] = useState("");
  const [textoDigitado, setTextoDigitado] = useState("");
  const [carregando, setCarregando] = useState(false);

  const buscarNovaFrase = async () => {
    if (carregando) return;
    setCarregando(true);
    setFraseCompleta("");

    const dados = await obterFraseAleatoria();

    if (dados && dados.frase) {
        setFraseCompleta(dados.frase);
    } else {
        setFraseCompleta(
        "Se você mergulhar uma passa em um suco de uva ela vira uma uva?",
      );
    }
  };

  useEffect(() => {
    buscarNovaFrase();
  }, []);

  useEffect(() => {
    if (!fraseCompleta) return;

    setTextoDigitado("");
    let i = 0;

    const timer = setInterval(() => {
      setTextoDigitado(fraseCompleta.slice(0, i + 1));
      i++;

      if (i >= fraseCompleta.length) {
        clearInterval(timer);
        setCarregando(false);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [fraseCompleta]);

  return (
    <div className="containerMomentoBloom liquid">
      <div className="containerComecoMomentoBloom">
        <header className="headerMomentoBloom">
          <img className="folhasMomento" src={folhasMomentoBloom} alt="" />
          <h1 className="textoGradiente">Momento Bloom</h1>
        </header>

        <h1 className="textoMomentoBloom">{textoDigitado}</h1>
      </div>

      <div
        className="botaoMaisBloom containerVerde"
        onClick={buscarNovaFrase}
        style={{
          opacity: carregando ? 0.7 : 1,
          cursor: carregando ? "default" : "pointer",
        }}
      >
        <img src={bolhaMensagem} alt="" />
        <p>Mais Bloom</p>
        <img src={setaMensagem} alt="" />
      </div>

      <img className="imagemFundo" src={folhasFundo} alt="" />
    </div>
  );
}

export default CardMomentoBloom;
