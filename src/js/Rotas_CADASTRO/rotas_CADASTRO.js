import axios from "axios";

// export async function cadastrarUsuario(usuario) {
//     let url = "http://rota.com";

//     try {
//         await axios.post(url, {
//             nome: usuario.nome,
//             email: usuario.email,
//             telefone: usuario.telefone,
//             senha: usuario.senha
//         });

//         return true; 
        
//     } catch (error) {
//         console.error("Erro no cadastro:", error);
//         return false; 
//     }
// }

export async function cadastrarUsuario(usuario) {
    let url = "http://rota.com";

    try {
        console.log("Usuário cadastrado com sucesso:", usuario);
        return true; 
        
    } catch (error) {
        console.error("Erro no cadastro:", error);
        return false; 
    }
}