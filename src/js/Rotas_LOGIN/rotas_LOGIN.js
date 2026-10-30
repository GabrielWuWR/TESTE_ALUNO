import axios from "axios";

const usuariosEstaticos = [
    {
        id: 1,
        email: "teste@gmail.com",
        senha: "123",
        apelido: "Manoel",
        foto: "https://i.pinimg.com/236x/e3/d9/4e/e3d94e2547bbdce409016f3260762577.jpg"
    },
    {
        id: 2,
        email: "marcel@gmail.com",
        senha: "456",
        apelido: "Marcel",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVeDZYEF7Re8Dx4CcWY6KU8qXg_0_WZ5gxNnXu4BMUuiUgbRV4hBCk-U8&s=10"
    },
    {
        id: 3,
        email: "leonid@gmail.com",
        senha: "789",
        apelido: "Leonid",
        foto: "https://i.pinimg.com/474x/94/0d/f7/940df75cd3996ca94ecb7df5545913ea.jpg"
    }
];

export async function autenticarUsuario(email, senha) {
    let url = "http://rota.com";

    try {
        const resposta = await axios.post(url, {
            email: email,
            senha: senha
        });

        if (resposta.data) {
            return resposta.data;
        }

        return false;

    } catch (erro) {
        console.error("erro ao tentar autenticar");
        for (let i = 0; i < usuariosEstaticos.length; i++) {
            let usuario = usuariosEstaticos[i];

            if (usuario.email === email && usuario.senha === senha) {
                let dadosParaRetornar = Object.assign({}, usuario);
                delete dadosParaRetornar.senha;
                return dadosParaRetornar;
            }
        }

        return false;
    }
}

const emailsGooglePermitidos = [
    "gabriel5678uo@gmail.com",
    "marcel.google@gmail.com",
    "leonid.google@gmail.com"
];

export async function autenticarUsuarioGoogle(token) {
    let url = "http://rota.com";

    try {
        const resposta = await axios.post(url, {
            token: token
        });

        if (resposta.data) {
            return resposta.data;
        }

        return false;

    } catch (erro) {
        console.log("Erro na API");

        try {
            const respostaGoogle = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            const dadosGoogle = respostaGoogle.data;

            if (!dadosGoogle || !dadosGoogle.email) {
                return { 
                    sucesso: false, 
                    mensagem: "E-mail não encontrado no retorno do Google." 
                };
            }

            const emailPermitido = emailsGooglePermitidos.includes(dadosGoogle.email);

            if (!emailPermitido) {
                return { 
                    sucesso: false, 
                    mensagem: "Usuário não autorizado na verificação estática." 
                };
            }

            return {
                sucesso: true,
                usuario: {
                    id: dadosGoogle.sub,
                    email: dadosGoogle.email,
                    apelido: dadosGoogle.name,
                    foto: dadosGoogle.picture || null
                }
            };

        } catch (erroGoogle) {
            console.error("Falha ao consultar o Google", erroGoogle);
            return { 
                sucesso: false, 
                mensagem: "O token fornecido expirou ou é inválido." 
            };
        }
    }
}

const emailsFacebookPermitidos = [
    "gabriel5678uo@facebook.com",
    "marcel.facebook@gmail.com",
    "leonid.facebook@gmail.com"
];

export async function autenticarUsuarioFacebook(token) {
    let url = "http://rota.com";

    try {
        const resposta = await axios.post(url, {
            token: token
        });

        if (resposta.data) {
            return resposta.data;
        }

        return false;

    } catch (erro) {
        console.log("Erro na API");

        try {
            const respostaFacebook = await axios.get(`https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${token}`);
            
            const dadosFacebook = respostaFacebook.data;

            if (!dadosFacebook || !dadosFacebook.email) {
                return { 
                    sucesso: false, 
                    mensagem: "E-mail não encontrado no retorno do Facebook." 
                };
            }

            const emailPermitido = emailsFacebookPermitidos.includes(dadosFacebook.email);

            if (!emailPermitido) {
                return { 
                    sucesso: false, 
                    mensagem: "Usuário não autorizado na verificação estática." 
                };
            }

            return {
                sucesso: true,
                usuario: {
                    id: dadosFacebook.id,
                    email: dadosFacebook.email,
                    apelido: dadosFacebook.name,
                    foto: dadosFacebook.picture?.data?.url || null
                }
            };

        } catch (erroFacebook) {
            console.error("Falha ao consultar o Facebook", erroFacebook);
            return { 
                sucesso: false, 
                mensagem: "O token fornecido expirou ou é inválido." 
            };
        }
    }
}