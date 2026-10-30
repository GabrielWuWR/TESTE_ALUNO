import { useState } from "react";
import { mudarSenha } from "../../js/Rotas_RECUPERAR_SENHA/rotas_RECUPERAR_SENHA.js";

export function AutenticacaoTrocarSenha(email, codigo, aoAlterarSucesso) {
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");

  const [erroSenha, setErroSenha] = useState(false);
  const [erroRepetirSenha, setErroRepetirSenha] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const atualizarSenha = (e) => {
    setSenha(e.target.value);
    if (erroSenha) setErroSenha(false);
    if (mensagemErro) setMensagemErro("");
  };

  const atualizarRepetirSenha = (e) => {
    setRepetirSenha(e.target.value);
    if (erroRepetirSenha) setErroRepetirSenha(false);
    if (mensagemErro) setMensagemErro("");
  };

  const realizarTrocaSenha = async () => {
    setMensagemErro("");
    setErroSenha(false);
    setErroRepetirSenha(false);

    if (!senha) {
      setErroSenha(true);
      setMensagemErro("Por favor, preencha a nova senha.");
      return;
    }

    if (senha.length < 6) {
      setErroSenha(true);
      setMensagemErro("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (!repetirSenha) {
      setErroRepetirSenha(true);
      setMensagemErro("Por favor, confirme a nova senha.");
      return;
    }

    if (senha !== repetirSenha) {
      setErroSenha(true);
      setErroRepetirSenha(true);
      setMensagemErro("As senhas não coincidem.");
      return;
    }

    setCarregando(true);
    try {
      const sucesso = await mudarSenha(senha);

      if (sucesso) {
        if (aoAlterarSucesso) aoAlterarSucesso();
      } else {
        setMensagemErro("Erro ao alterar a senha. Tente novamente mais tarde.");
      }
    } catch (erro) {
      setMensagemErro("Ocorreu um erro inesperado.");
    } finally {
      setCarregando(false);
    }
  };

  const verificarTeclaEnter = (e) => {
    if (e.key === "Enter" && !carregando) {
      realizarTrocaSenha();
    }
  };

  return {
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
  };
}