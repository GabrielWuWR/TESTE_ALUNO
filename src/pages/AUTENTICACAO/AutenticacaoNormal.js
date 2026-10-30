import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { autenticarUsuario } from "../../js/Rotas_LOGIN/rotas_LOGIN.js";

export function AutenticacaoNormal() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erroEmail, setErroEmail] = useState(false);
    const [erroSenha, setErroSenha] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");
    const [estaTransicionando, setEstaTransicionando] = useState(false);
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [statusFormatoEmail, setStatusFormatoEmail] = useState("vazio");

    const navigate = useNavigate();

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

    const atualizarSenha = (e) => {
        setSenha(e.target.value);
        if (erroSenha) setErroSenha(false);
        if (mensagemErro) setMensagemErro("");
    };

    const verificarTeclaEnter = (e) => {
        if (e.key === "Enter") {
            realizarLogin();
        }
    };

    const realizarLogin = async () => {
        setMensagemErro("");
        setErroEmail(false);
        setErroSenha(false);

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
        if (!senha) {
            setErroSenha(true);
            setMensagemErro("Por favor, preencha a senha.");
            return;
        }

        const usuario = await autenticarUsuario(email, senha);

        if (usuario) {
            localStorage.setItem("usuarioBloom", JSON.stringify(usuario));
            sessionStorage.removeItem("animacaoHomeTocou");
            sessionStorage.removeItem("dadosHomeCarregados");
            setUsuarioLogado(usuario);
            setEstaTransicionando(true);
        } else {
            setErroEmail(true);
            setErroSenha(true);
            setMensagemErro("E-mail ou senha incorretos.");
        }
    };

    const finalizarTransicao = useCallback((usuarioRedeSocial) => {
        const usuarioParaNavegar = usuarioRedeSocial || usuarioLogado;
        navigate("/home", { state: { usuario: usuarioParaNavegar } });
    }, [navigate, usuarioLogado]);

    return {
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
        finalizarTransicao
    };
}