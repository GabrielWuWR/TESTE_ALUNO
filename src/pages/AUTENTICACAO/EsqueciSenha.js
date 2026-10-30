import { useState } from "react";
import { enviarEmail } from "../../js/Rotas_RECUPERAR_SENHA/rotas_RECUPERAR_SENHA.js";

export function EsqueciSenha(aoSucesso) {
    const [email, setEmail] = useState("");
    const [erroEmail, setErroEmail] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");
    const [statusFormatoEmail, setStatusFormatoEmail] = useState("vazio");
    const [carregando, setCarregando] = useState(false);

    const atualizarEmail = (e) => {
        setEmail(e.target.value);
        if (erroEmail) setErroEmail(false);
        if (mensagemErro) setMensagemErro("");
        
        if (e.target.value.trim() !== "") {
            setStatusFormatoEmail("valido");
        } else {
            setStatusFormatoEmail("vazio");
        }
    };

    const lidarDiagnosticoEmail = (tipoErro) => {
        setStatusFormatoEmail(tipoErro);
        if (tipoErro === "valido" && erroEmail) {
            setErroEmail(false);
            if (mensagemErro.includes("e-mail")) setMensagemErro("");
        }
    };

    const verificarTeclaEnter = (e) => {
        if (e.key === "Enter") {
            realizarEnvio();
        }
    };

    const realizarEnvio = async () => {
        setMensagemErro("");
        setErroEmail(false);

        if (email.trim() !== "" && statusFormatoEmail === "vazio") {
            setStatusFormatoEmail("valido");
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

        try {
            setCarregando(true);
            await enviarEmail(email);

            if (aoSucesso) {
                aoSucesso(email);
            }
        } catch (error) {
            setErroEmail(true);
            setMensagemErro("Ocorreu um erro ao enviar o e-mail. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    };

    return {
        email,
        erroEmail,
        mensagemErro,
        carregando,
        atualizarEmail,
        lidarDiagnosticoEmail,
        verificarTeclaEnter,
        realizarEnvio,
    };
}