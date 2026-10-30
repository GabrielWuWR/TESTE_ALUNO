import { motion } from "framer-motion";
import Input from "../../components/Gerais/Input/Input";
import Icone from "../../components/Gerais/Icone/Icone.jsx";
import setaVoltar from "../../img/icones/setaVoltar.svg";
import { AutenticacaoTrocarSenha } from "./AutenticacaoTrocarSenha";

function CardTrocarSenha({ email, codigo, voltarParaInserirCodigo, aoTrocarSucesso }) {
  const {
    senha,
    repetirSenha,
    erroSenha,
    erroRepetirSenha,
    mensagemErro,
    carregando,
    atualizarSenha,
    atualizarRepetirSenha,
    verificarTeclaEnter,
    realizarTrocaSenha,
  } = AutenticacaoTrocarSenha(email, codigo, aoTrocarSucesso);

  return (
    <motion.div
      className="containerLogin liquid"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
    >
      <div className="conteudoCard cardTrocarSenha">
        <div className="containerLogo">
          <div className="containerVoltar" onClick={voltarParaInserirCodigo}>
            <Icone
              className={"botaoVoltar"}
              imagem={setaVoltar}
              largura={"3.5rem"}
              altura={"3.5rem"}
            />
          </div>
        </div>

        <header className="cabecalhoAut">
          <h1 className="textoGradiente">Redefinir senha</h1>
          <p className="textoCabecalho">Crie uma nova senha segura</p>
        </header>

        <div className="contaienerInputsNovaSenha">
          <Input 
            placeholder={"Nova senha"} 
            tipo={"senha"}
            valor={senha}
            aoAlterar={atualizarSenha}
            aoPressionarTecla={verificarTeclaEnter}
            erro={erroSenha}
          />
          <Input 
            placeholder={"Confirmar senha"} 
            tipo={"senha"}
            valor={repetirSenha}
            aoAlterar={atualizarRepetirSenha}
            aoPressionarTecla={verificarTeclaEnter}
            erro={erroRepetirSenha}
          />
        </div>

        <div className="blocoMensagemErro">
          <span className="mensagemErro">{mensagemErro}</span>
        </div>

        <div 
          className="botaoVerificar containerVerde"
          onClick={!carregando ? realizarTrocaSenha : undefined}
          style={{ cursor: carregando ? "not-allowed" : "pointer", opacity: carregando ? 0.7 : 1 }}
        >
          <h1>Confirmar</h1>
        </div>
      </div>
    </motion.div>
  );
}

export default CardTrocarSenha;