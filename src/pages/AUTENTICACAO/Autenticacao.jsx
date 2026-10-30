import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import "./Autenticacao.css";
import TransicaoBloom from "../../components/Login/TransicaoBloom/TransicaoBloom.jsx";
import videoFundo from "../../img/backgroundLogin.mp4";
import CardLogin from "./CardLogin.jsx";
import CardCadastro from "./CardCadastro.jsx";
import CardEsqueciSenha from "./CardEsqueciSenha.jsx";
import CardInserirCodigo from "./CardInserirCodigo.jsx";
import CardTrocarSenha from "./CardTrocarSenha.jsx";

function Autenticar() {
  const [etapaAtual, setEtapaAtual] = useState("login");
  const [podeTrocar, setPodeTrocar] = useState(true);
  const [emailRecuperacao, setEmailRecuperacao] = useState("");
  const [codigoValidado, setCodigoValidado] = useState("");
  
  const [transicao, setTransicao] = useState({
    ativo: false,
    usuario: null,
    funcaoFinalizar: null
  });

  const iniciarTransicao = useCallback((usuario, funcaoFinalizar) => {
    setTransicao((prev) => {
      if (prev.ativo) return prev;
      return { ativo: true, usuario, funcaoFinalizar };
    });
  }, []);

  const aoFinalizarAnimacao = useCallback(() => {
    if (transicao.funcaoFinalizar) {
      transicao.funcaoFinalizar(transicao.usuario);
    }
  }, [transicao]);

  const alternarEtapa = (novaEtapa) => {
    if (!podeTrocar) return;

    setPodeTrocar(false);
    setEtapaAtual(novaEtapa);

    setTimeout(() => {
      setPodeTrocar(true);
    }, 1200);
  };

  return (
    <div className="paginaAutenticar">
      <video autoPlay loop muted playsInline className="videoFundo">
        <source src={videoFundo} type="video/mp4" />
      </video>

      <TransicaoBloom
        ativo={transicao.ativo}
        apelido={transicao.usuario?.apelido}
        aoFinalizar={aoFinalizarAnimacao}
      />

      <AnimatePresence mode="wait">
        {etapaAtual === "login" && (
          <CardLogin
            key="login"
            ativoTransicao={transicao.ativo}
            irParaCadastro={() => alternarEtapa("cadastro")}
            irParaEsqueciSenha={() => alternarEtapa("esqueciSenha")}
            aoIniciarTransicao={iniciarTransicao}
          />
        )}

        {etapaAtual === "cadastro" && (
          <CardCadastro
            key="cadastro"
            ativoTransicao={transicao.ativo}
            irParaLogin={() => alternarEtapa("login")}
            aoIniciarTransicao={iniciarTransicao}
          />
        )}

        {etapaAtual === "esqueciSenha" && (
          <CardEsqueciSenha
            key="esqueciSenha"
            irParaLogin={() => alternarEtapa("login")}
            aoEnviarSucesso={(emailDigitado) => {
              setEmailRecuperacao(emailDigitado);
              alternarEtapa("inserirCodigo");
            }}
          />
        )}

        {etapaAtual === "inserirCodigo" && (
          <CardInserirCodigo
            key="inserirCodigo"
            email={emailRecuperacao}
            voltarParaEsqueciSenha={() => alternarEtapa("esqueciSenha")}
            aoVerificarSucesso={(codigoDigitado) => {
              setCodigoValidado(codigoDigitado);
              alternarEtapa("trocarSenha");
            }}
          />
        )}

        {etapaAtual === "trocarSenha" && (
          <CardTrocarSenha
            key="trocarSenha"
            email={emailRecuperacao}
            codigo={codigoValidado}
            voltarParaInserirCodigo={() => alternarEtapa("inserirCodigo")}
            aoTrocarSucesso={() => alternarEtapa("login")}
          />
        )}

        
      </AnimatePresence>
    </div>
  );
}

export default Autenticar;