import { motion, AnimatePresence } from "framer-motion";
import Input from "../../components/Gerais/Input/Input";
import iconeUsuario from "../../img/icones/pessoaIcone.svg";
import iconeEmail from "../../img/icones/emailIcone.svg";
import iconeTelefone from "../../img/icones/telefoneIcone.svg";
import { AutenticacaoCadastro } from "./AutenticacaoCadastro.js";

function CardCadastro({ ativoTransicao, irParaLogin, aoIniciarTransicao }) {
  const {
    nome,
    email,
    telefone,
    senha,
    repetirSenha,
    erroNome,
    erroEmail,
    erroTelefone,
    erroSenha,
    erroRepetirSenha,
    mensagemErro,
    atualizarNome,
    lidarDiagnosticoNome,
    atualizarEmail,
    lidarDiagnosticoEmail,
    atualizarTelefone,
    lidarDiagnosticoTelefone,
    atualizarSenha,
    lidarPerderFocoSenha,
    atualizarRepetirSenha,
    lidarPerderFocoRepetirSenha,
    verificarTeclaEnter,
    realizarCadastro,
  } = AutenticacaoCadastro((usuario) => {
    localStorage.setItem("usuarioBloom", JSON.stringify(usuario));

    irParaLogin();
  }, irParaLogin);

  const animacaoCard = {
    escondido: { opacity: 0, filter: "blur(8px)" },
    visivel: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
    saindo: {
      opacity: 0,
      filter: "blur(8px)",
      transition: { duration: 0.3, ease: "easeIn", delay: 0.1 },
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
      className="containerCadastro liquid"
      variants={animacaoCard}
      initial="escondido"
      animate={animacaoAtual}
      exit="saindo"
    >
      <div className="conteudoCard">
        <div className="containerLogo"></div>

        <header className="cabecalhoAut">
          <h1 className="textoGradiente">Cadastro</h1>
          <p>Crie sua conta e comece sua jornada.</p>
        </header>

        <div className="containerInputsCadastro">
          <Input
            placeholder={"Nome completo"}
            tipo={"texto"}
            imagem={iconeUsuario}
            valor={nome}
            aoAlterar={atualizarNome}
            aoLidarErro={lidarDiagnosticoNome}
            erro={erroNome}
            aoPressionarTecla={verificarTeclaEnter}
            minimo={3}
            maximo={60}
          />

          <Input
            placeholder={"Exemplo@email.com"}
            tipo={"email"}
            imagem={iconeEmail}
            valor={email}
            aoAlterar={atualizarEmail}
            aoLidarErro={lidarDiagnosticoEmail}
            erro={erroEmail}
            aoPressionarTecla={verificarTeclaEnter}
            maximo={100}
          />

          <Input
            placeholder={"(99) 99999-9999"}
            tipo={"phone"}
            imagem={iconeTelefone}
            valor={telefone}
            aoAlterar={atualizarTelefone}
            aoLidarErro={lidarDiagnosticoTelefone}
            erro={erroTelefone}
            aoPressionarTecla={verificarTeclaEnter}
          />

          <div className="linhaInputs">
            <Input
              placeholder={"Senha"}
              tipo={"senha"}
              valor={senha}
              aoAlterar={atualizarSenha}
              aoPerderFoco={lidarPerderFocoSenha}
              erro={erroSenha}
              aoPressionarTecla={verificarTeclaEnter}
              minimo={6}
              maximo={30}
            />
            <Input
              placeholder={"Repetir senha"}
              tipo={"senha"}
              valor={repetirSenha}
              aoAlterar={atualizarRepetirSenha}
              aoPerderFoco={lidarPerderFocoRepetirSenha}
              erro={erroRepetirSenha}
              aoPressionarTecla={verificarTeclaEnter}
              minimo={6}
              maximo={30}
            />
          </div>
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

        <div
          className="botaoCadastrar containerVerde"
          onClick={realizarCadastro}
        >
          <h1>Cadastrar</h1>
        </div>
      </div>

      <div className="rodapeCard">
        <div className="criarConta">
          <h1>
            Já possui uma conta?
            <span
              onClick={() => {
                const temDados =
                  nome || email || telefone || senha || repetirSenha;

                if (temDados) {
                  const confirmar = window.confirm(
                    "Se você sair agora, os dados preenchidos serão perdidos. Deseja continuar?",
                  );
                  if (confirmar) irParaLogin();
                } else {
                  irParaLogin();
                }
              }}
            >
              Clique aqui
            </span>
          </h1>
        </div>
      </div>
    </motion.div>
  );
}

export default CardCadastro;
