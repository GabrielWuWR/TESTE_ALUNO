import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../../components/Gerais/Input/Input";
import Icone from "../../components/Gerais/Icone/Icone.jsx";
import setaVoltar from "../../img/icones/setaVoltar.svg";
import { verificarCodigo } from "../../js/Rotas_RECUPERAR_SENHA/rotas_RECUPERAR_SENHA.js";

function CardInserirCodigo({ email, voltarParaEsqueciSenha, aoVerificarSucesso }) {
  const [codigo, setCodigo] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const handleAlterarCodigo = (e) => {
    setCodigo(e.target.value);
    setErro("");
  };

  const handleVerificar = async () => {
    if (codigo.length < 4) {
      setErro("Digite os 4 dígitos do código.");
      return;
    }

    setCarregando(true);
    try {
      const resultado = await verificarCodigo(codigo);
      
      if (resultado) {
        if (aoVerificarSucesso) aoVerificarSucesso(codigo);
      } else {
        setErro("Código inválido. Tente novamente.");
      }
    } catch (err) {
      setErro("Ocorreu um erro ao verificar o código.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <motion.div
      className="containerLogin liquid"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
    >
      <div className="conteudoCard cardRecuperarAcesso">
        <div className="containerLogo">
          <div className="containerVoltar" onClick={voltarParaEsqueciSenha}>
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
          <p className="textoCabecalho">Enviamos um link para seu e-mail</p>
          <h2 className="textoGradiente">{email}</h2>
        </header>

        <div className="containerCodigo">
          <h3 className="textoGradiente">Insira o código</h3>
          <Input
            tipo={"caracteres"}
            quantidade={4}
            valor={codigo}
            aoAlterar={handleAlterarCodigo}
          />
          {erro && <p className="textoErro" style={{ color: "red" }}>{erro}</p>}
        </div>

        <div 
          className="botaoVerificar containerVerde"
          onClick={!carregando ? handleVerificar : undefined}
          style={{ cursor: carregando ? "not-allowed" : "pointer", opacity: carregando ? 0.7 : 1 }}
        >
          <h1>{carregando ? "Verificando..." : "Verificar"}</h1>
        </div>
      </div>
    </motion.div>
  );
}

export default CardInserirCodigo;