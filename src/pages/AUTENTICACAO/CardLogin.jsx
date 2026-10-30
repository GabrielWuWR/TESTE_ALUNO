import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../../components/Gerais/Input/Input.jsx";
import iconeEmail from "../../img/icones/emailIcone.svg";
import iconeGoogle from "../../img/icones/Google.svg";
import iconeFacebook from "../../img/icones/Facebook.svg";
import { AutenticacaoNormal } from "./AutenticacaoNormal.js";
import { AutenticacaoGoogle } from "./AutenticacaoGoogle.js";
import { AutenticacaoFacebook } from "./AutenticacaoFacebook.js";

function CardLogin({
  ativoTransicao,
  irParaCadastro,
  irParaEsqueciSenha,
  aoIniciarTransicao,
}) {
  const {
    email,
    senha,
    erroEmail,
    erroSenha,
    mensagemErro,
    setMensagemErro,
    estaTransicionando,
    usuarioLogado,
    atualizarEmail,
    lidarDiagnosticoEmail,
    atualizarSenha,
    verificarTeclaEnter,
    realizarLogin,
    finalizarTransicao,
  } = AutenticacaoNormal();

  useEffect(() => {
    if (estaTransicionando && usuarioLogado) {
      aoIniciarTransicao(usuarioLogado, finalizarTransicao);
    }
  }, [
    estaTransicionando,
    usuarioLogado,
    aoIniciarTransicao,
    finalizarTransicao,
  ]);

  const lidarSucessoGoogle = (usuario) => {
    localStorage.setItem("usuarioBloom", JSON.stringify(usuario));
    sessionStorage.removeItem("animacaoHomeTocou");
    sessionStorage.removeItem("dadosHomeCarregados");
    aoIniciarTransicao(usuario, finalizarTransicao);
  };

  const iniciarLoginGoogle = AutenticacaoGoogle(lidarSucessoGoogle, (msg) => {
    if (setMensagemErro) setMensagemErro(msg);
  });

  const lidarSucessoFacebook = (usuario) => {
    localStorage.setItem("usuarioBloom", JSON.stringify(usuario));
    sessionStorage.removeItem("animacaoHomeTocou");
    sessionStorage.removeItem("dadosHomeCarregados");
    aoIniciarTransicao(usuario, finalizarTransicao);
  };

  const iniciarLoginFacebook = AutenticacaoFacebook(
    lidarSucessoFacebook,
    (msg) => {
      if (setMensagemErro) setMensagemErro(msg);
    },
  );

  const animacaoCard = {
    escondido: {
      opacity: 0,
      filter: "blur(8px)",
    },
    visivel: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    saindo: {
      opacity: 0,
      filter: "blur(8px)",
      transition: {
        duration: 0.3,
        ease: "easeIn",
        delay: 0.1,
      },
    },
  };

  const animacaoAtual = ativoTransicao
    ? {
        scale: 0.86,
        opacity: 0,
        filter: "blur(22px)",
        y: 32,
        transition: { duration: 1.25, ease: "easeInOut" },
      }
    : "visivel";

  return (
    <motion.div
      className="containerLogin liquid"
      variants={animacaoCard}
      initial="escondido"
      animate={animacaoAtual}
      exit="saindo"
    >
      <div className="conteudoCard">
        <div className="containerLogo"></div>
        <header className="cabecalhoAut">
          <h1 className="textoGradiente">Bem vindo de volta!</h1>
          <p>Entre para continuar a sua jornada.</p>
        </header>

        <div className="containerInputsLogin">
          <Input
            imagem={iconeEmail}
            placeholder={"Exemplo@email.com"}
            tipo={"email"}
            valor={email}
            aoAlterar={atualizarEmail}
            aoLidarErro={lidarDiagnosticoEmail}
            erro={erroEmail}
            aoPressionarTecla={verificarTeclaEnter}
          />
          <Input
            placeholder={"Senha"}
            tipo={"senha"}
            valor={senha}
            aoAlterar={atualizarSenha}
            erro={erroSenha}
            aoPressionarTecla={verificarTeclaEnter}
          />
        </div>

        <div className="blocoMensagemErro">
          <AnimatePresence>
            {mensagemErro && (
              <motion.p
                className="mensagemErro"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {mensagemErro}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="botaoLogin containerVerde" onClick={realizarLogin}>
          <h1>Entrar</h1>
        </div>

        <div className="esqueceuSenha" onClick={irParaEsqueciSenha}>
          <p className="textoGradiente textoSenha">Esqueceu a senha?</p>
        </div>

        <div className="containerRedes">
          <div
            className="containerRede liquid"
            onClick={() => iniciarLoginGoogle()}
          >
            <div className="iconeRede liquid">
              <img src={iconeGoogle} alt="Google" />
            </div>
            <h1>Login com o Google</h1>
          </div>

          <div
            className="containerRede liquid"
            onClick={() => iniciarLoginFacebook()}
          >
            <div className="iconeRede liquid">
              <img src={iconeFacebook} alt="" />
            </div>
            <h1>Login com o Facebook</h1>
          </div>
        </div>
      </div>

      <div className="rodapeCard">
        <div className="criarConta">
          <h1>
            Ainda não tem uma conta?
            <span onClick={irParaCadastro}>Clique aqui</span>
          </h1>
        </div>
      </div>
    </motion.div>
  );
}

export default CardLogin;
