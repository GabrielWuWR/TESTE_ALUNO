import { useState, useEffect } from "react";
import { cadastrarUsuario } from "../../js/Rotas_CADASTRO/rotas_CADASTRO.js";

export function AutenticacaoCadastro(aoCadastrarSucesso, irParaLogin) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");

  const [erroNome, setErroNome] = useState(false);
  const [erroEmail, setErroEmail] = useState(false);
  const [erroTelefone, setErroTelefone] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);
  const [erroRepetirSenha, setErroRepetirSenha] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const [statusFormatoNome, setStatusFormatoNome] = useState("vazio");
  const [statusFormatoEmail, setStatusFormatoEmail] = useState("vazio");
  const [statusFormatoTelefone, setStatusFormatoTelefone] = useState("vazio");

  useEffect(() => {
    const temDadosDigitados = nome || email || telefone || senha || repetirSenha;

    const lidarAntesDeDescarregar = (e) => {
      if (temDadosDigitados) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", lidarAntesDeDescarregar);

    return () => {
      window.removeEventListener("beforeunload", lidarAntesDeDescarregar);
    };
  }, [nome, email, telefone, senha, repetirSenha]);

  const atualizarNome = (e) => {
    setNome(e.target.value);
    if (erroNome) setErroNome(false);
    if (mensagemErro) setMensagemErro("");
  };

  const lidarDiagnosticoNome = (tipoErro) => {
    setStatusFormatoNome(tipoErro);
    if (tipoErro === "valido" && erroNome) {
      setErroNome(false);
      if (mensagemErro.includes("nome")) setMensagemErro("");
    }
  };

  const atualizarEmail = (e) => {
    setEmail(e.target.value);
    if (erroEmail) setErroEmail(false);
    if (mensagemErro) setMensagemErro("");
  };

  const lidarDiagnosticoEmail = (tipoErro) => {
    setStatusFormatoEmail(tipoErro);
    if (tipoErro === "valido" && erroEmail) {
      setErroEmail(false);
      if (mensagemErro.includes("e-mail")) setMensagemErro("");
    }
  };

  const atualizarTelefone = (e) => {
    setTelefone(e.target.value);
    if (erroTelefone) setErroTelefone(false);
    if (mensagemErro) setMensagemErro("");
  };

  const lidarDiagnosticoTelefone = (tipoErro) => {
    setStatusFormatoTelefone(tipoErro);
    if (tipoErro === "valido" && erroTelefone) {
      setErroTelefone(false);
      if (mensagemErro.includes("telefone")) setMensagemErro("");
    }
  };

  const atualizarSenha = (e) => {
    const val = e.target.value;
    setSenha(val);
    if (erroSenha) setErroSenha(false);
    if (mensagemErro.includes("senha") || mensagemErro.includes("coincidem")) setMensagemErro("");
    if (val === repetirSenha) setErroRepetirSenha(false);
  };

  const lidarPerderFocoSenha = () => {
    if (senha.length > 0 && senha.length < 6) {
      setErroSenha(true);
      setMensagemErro("A senha deve ter no mínimo 6 caracteres.");
    }
  };

  const atualizarRepetirSenha = (e) => {
    const val = e.target.value;
    setRepetirSenha(val);
    if (erroRepetirSenha) setErroRepetirSenha(false);
    if (mensagemErro.includes("coincidem")) setMensagemErro("");
    if (val === senha) setErroRepetirSenha(false);
  };

  const lidarPerderFocoRepetirSenha = () => {
    if (repetirSenha.length > 0 && senha !== repetirSenha) {
      setErroRepetirSenha(true);
      setMensagemErro("As senhas não coincidem.");
    }
  };

  const realizarCadastro = async () => {
    setMensagemErro("");
    setErroNome(false);
    setErroEmail(false);
    setErroTelefone(false);
    setErroSenha(false);
    setErroRepetirSenha(false);

    if (statusFormatoNome === "minimo_nao_atingido" || statusFormatoNome === "vazio") {
      setErroNome(true);
      setMensagemErro("O nome deve ter no mínimo 3 caracteres.");
      return;
    }

    if (statusFormatoEmail === "vazio") {
      setErroEmail(true);
      setMensagemErro("Por favor, preencha o e-mail.");
      return;
    }
    if (statusFormatoEmail === "formato_invalido") {
      setErroEmail(true);
      setMensagemErro("Por favor, insira um e-mail válido.");
      return;
    }

    if (statusFormatoTelefone === "invalido" || statusFormatoTelefone === "vazio") {
      setErroTelefone(true);
      setMensagemErro("Por favor, insira um telefone válido.");
      return;
    }

    if (!senha || senha.length < 6) {
      setErroSenha(true);
      setMensagemErro("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (senha !== repetirSenha) {
      setErroSenha(true);
      setErroRepetirSenha(true);
      setMensagemErro("As senhas não coincidem.");
      return;
    }

    const dadosUsuario = { nome, email, telefone, senha };

    const sucesso = await cadastrarUsuario(dadosUsuario);

    if (sucesso) {
      if (aoCadastrarSucesso) aoCadastrarSucesso(dadosUsuario);
      if (irParaLogin) irParaLogin();
    } else {
      setMensagemErro("Erro ao realizar o cadastro. Tente novamente mais tarde.");
    }
  };

  const verificarTeclaEnter = (e) => {
    if (e.key === "Enter") realizarCadastro();
  };

  return {
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
  };
}