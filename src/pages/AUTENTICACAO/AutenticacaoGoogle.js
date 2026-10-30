import { useGoogleLogin } from "@react-oauth/google";

import { autenticarUsuarioGoogle } from "../../js/Rotas_LOGIN/rotas_LOGIN.js";



export function AutenticacaoGoogle(aoLogarComSucesso, aoFalhar) {
    const login = useGoogleLogin({
        onSuccess: async (resposta) => {
            const respostaAPI = await autenticarUsuarioGoogle(resposta.access_token);
            const dadosUsuario = respostaAPI?.usuario || respostaAPI;

            if (respostaAPI && (respostaAPI.sucesso !== false)) {
                aoLogarComSucesso(dadosUsuario);
            } else {
                if (aoFalhar) aoFalhar("Conta não encontrada.");
            }
        },

        onError: (erro) => {
            console.log("Erro ao carregar as coisas do google", erro);
            if (aoFalhar) aoFalhar("Erro ao conectar com o Google.");
        }

    });

    return login;

}