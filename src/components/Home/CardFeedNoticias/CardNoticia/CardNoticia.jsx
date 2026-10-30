import "./CardNoticia.css";
import iconeSeta from "../../../../img/icones/setaEsquerdaEscuraIcone.svg";

function formatarDataRelativa(dataString, horaString) {
  try {
    if (!dataString || !horaString) return "";

    const dataNoticiaZerada = new Date(`${dataString}T00:00:00`);
    if (isNaN(dataNoticiaZerada.getTime())) return "";

    const dataAtualZerada = new Date();
    dataAtualZerada.setHours(0, 0, 0, 0);

    const diferencaTempo =
      dataNoticiaZerada.getTime() - dataAtualZerada.getTime();
    const diferencaDias = Math.round(diferencaTempo / (1000 * 3600 * 24));

    const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });

    if (diferencaDias === 0) {
      return `Hoje, ${horaString}`;
    } else if (diferencaDias === -1) {
      return `Ontem, ${horaString}`;
    } else if (diferencaDias === -2) {
      return `Anteontem, ${horaString}`;
    } else if (diferencaDias > -7 && diferencaDias < 0) {
      return `${rtf.format(diferencaDias, "day")}, ${horaString}`;
    } else {
      const dataFormatada = dataNoticiaZerada.toLocaleDateString("pt-BR");
      return `${dataFormatada}, ${horaString}`;
    }
  } catch (error) {
    return "";
  }
}

function CardNoticia({ noticia }) {
  function irPara() {
    alert(`Indo para a notícia ${noticia.url}`);
  }

  const dataExibicao = formatarDataRelativa(noticia.data, noticia.hora);

  return (
    <div className="containerNoticia liquid" onClick={irPara}>
      <img className="fotoNoticia" src={noticia.imagem} alt={noticia.nome} />

      <div className="conteudoNoticia">
        <div className="cimaNoticia">
          <div className="nomeInstituicao">
            <p>{noticia.instituicao}</p>
          </div>
          <h1 className="dataNoticia">{dataExibicao}</h1>
        </div>

        <h1 className="noticiaNome" title={noticia.nome}>
          {noticia.nome}
        </h1>
      </div>

      <img className="setaNoticia" src={iconeSeta} alt="Ir para notícia" />
    </div>
  );
}

export default CardNoticia;