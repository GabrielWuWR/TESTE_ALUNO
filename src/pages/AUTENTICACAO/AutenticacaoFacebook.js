import { autenticarUsuarioFacebook } from "../../js/Rotas_LOGIN/rotas_LOGIN.js";

export function AutenticacaoFacebook(aoLogarComSucesso, aoFalhar) {
    
    const iniciarLogin = () => {
        if (!window.FB) {
            if (aoFalhar) aoFalhar("Erro interno.");
            return;
        }
        window.FB.login(async (resposta) => {
            if (resposta.authResponse) {
                const token = resposta.authResponse.accessToken;
                const respostaAPI = await autenticarUsuarioFacebook(token);
                const dadosUsuario = respostaAPI?.usuario || respostaAPI;

                if (respostaAPI && (respostaAPI.sucesso !== false)) {
                    aoLogarComSucesso(dadosUsuario);
                } else {
                    if (aoFalhar) aoFalhar(respostaAPI?.mensagem || "Conta não encontrada ou não autorizada.");
                }
            } else {
                console.log("Usuário cancelou o login ou não autorizou.");
                if (aoFalhar) aoFalhar("Login com Facebook foi cancelado.");
            }
        }, { scope: 'public_profile,email' });
    };

    return iniciarLogin;
}