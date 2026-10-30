import axios from "axios";

export async function enviarEmail(email) {
    let url = "http://rota.com";

    try {
        const resposta = await axios.post(url, 
            {
                email: email
            }
        )

        if (resposta.data) {
            return resposta.data;
        }

        return false;
    } catch (error) {
        console.error("Falha ao enviar o e-mail", error);
    }
}

export async function verificarCodigo(codigo) {
    let url = "http://rota.com";

    try {
        const resposta = await axios.post(url,
            {
                codigo: codigo
            }
        )

        if (resposta.data) {
            return resposta.data;
        }

        return false;
    } catch (error) {
        console.error("Não foi possivel validar o codigo", error);
        return true; //TESTE 
    }
}

export async function mudarSenha(novaSenha) {
    let url = "http://rota.com";

    try {
        const resposta = await axios.post(url,
            {
                senha: novaSenha
            }
        )

        if (resposta.data) {
            return resposta.data;
        }

        return false;
    } catch (error) {
        console.error("Nao foi possivel alterar a senha", error);
        return true; //TESTE 
    }
}