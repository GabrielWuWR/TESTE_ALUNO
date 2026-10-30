import { motion, AnimatePresence } from "framer-motion";
import Input from "../../components/Gerais/Input/Input";
import Icone from "../../components/Gerais/Icone/Icone.jsx";
import setaVoltar from "../../img/icones/setaVoltar.svg";
import iconeEmail from "../../img/icones/emailIcone.svg";
import { EsqueciSenha } from "./EsqueciSenha.js";

function CardEsqueciSenha({ irParaLogin, aoEnviarSucesso }) {
  const {
    email,
    erroEmail,
    mensagemErro,
    carregando,
    atualizarEmail,
    lidarDiagnosticoEmail,
    verificarTeclaEnter,
    realizarEnvio,
  } = EsqueciSenha(aoEnviarSucesso);

  const animacaoCard = {
    escondido: { opacity: 0, filter: "blur(8px)" },
    visivel: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
    saindo: { opacity: 0, filter: "blur(8px)", transition: { duration: 0.3, ease: "easeIn", delay: 0.1 } },
  };

  return (
    <motion.div
      className="containerLogin liquid"
      variants={animacaoCard}
      initial="escondido"
      animate="visivel"
      exit="saindo"
    >
      <div className="conteudoCard cardEsqueciSenha">
        <div className="containerLogo">
          <div className="containerVoltar" onClick={irParaLogin}>
            <Icone
              className={"botaoVoltar"}
              imagem={setaVoltar}
              largura={"3.5rem"}
              altura={"3.5rem"}
            />
          </div>
        </div>

        <header className="cabecalhoAut">
          <h1 className="textoGradiente">Recupere seu acesso</h1>
          <p className="textoCabecalho">
            Insira seu e-mail e enviaremos um código para confirmar sua identidade.
          </p>
        </header>

        <Input
          imagem={iconeEmail}
          classeName={"inputEmail"}
          placeholder={"Exemplo@email.com"}
          tipo={"email"}
          valor={email}
          aoAlterar={atualizarEmail}
          aoLidarErro={lidarDiagnosticoEmail}
          erro={erroEmail}
          aoPressionarTecla={verificarTeclaEnter}
        />

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

        <div 
          className={`botaoEnviar containerVerde ${carregando ? "desativado" : ""}`} 
          onClick={!carregando ? realizarEnvio : undefined}
        >
          <h1>Enviar</h1>
        </div>
      </div>
    </motion.div>
  );
}

export default CardEsqueciSenha;