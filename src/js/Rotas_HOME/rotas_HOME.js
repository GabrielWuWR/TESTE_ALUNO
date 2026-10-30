import axios from "axios";
import frasesArquivo from "./frases.json";

//SEM AXIOS
// async function obterFraseAleatoria() {
//     let url = "A ROTA VAI FICAR AQUI";

//     try {
//         let response = await fetch(url);

//         if (response.ok) {
//             let respostaAPI = await response.json();

//             return respostaAPI;
//         } else {
//             const indiceAleatorio = Math.floor(Math.random() * frasesArquivo.length);
//             const fraseSorteada = frasesArquivo[indiceAleatorio];
//             return fraseSorteada;
//         }
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }

//COM AXIOS
const TEMPO_ATRASO = 0;

const atrasar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function obterFraseAleatoria() {
    let url = "http://rota.com";

    try {
        let response = await axios.get(url);
        await atrasar(TEMPO_ATRASO);
        return response.data;
    } catch (error) {
        console.error(error);
        console.warn("CONTEÚDO ESTÁTICO EM FRASE MOTIVACIONAL");

        await atrasar(TEMPO_ATRASO);
        const indiceAleatorio = Math.floor(Math.random() * frasesArquivo.length);
        const fraseSorteada = frasesArquivo[indiceAleatorio];
        return fraseSorteada;
    }
}

export async function obterTodasAsTarefas() {
    let url = "http://rota.com";

    try {
        let response = await axios.get(url);
        await atrasar(TEMPO_ATRASO);
        return response.data;
    } catch (error) {
        console.error(error);
        console.warn("CONTEÚDO ESTÁTICO EM TAREFAS");

        await atrasar(TEMPO_ATRASO);
        const tarefas = [
            { id: 1, icone: "https://png.pngtree.com/png-clipart/20250507/original/pngtree-dog-vector-icon-illustration-png-image_20938892.png", nome: "Passear no parque", partes: 0, partesTotais: 1, data: "2026-12-14" },
            { id: 2, icone: "https://png.pngtree.com/png-clipart/20250507/original/pngtree-dog-vector-icon-illustration-png-image_20938892.png", nome: "Limpar a casa", partes: 0, partesTotais: 5, data: "2026-10-11" },
            { id: 3, icone: "https://cdn-icons-png.flaticon.com/512/91/91544.png", nome: "Dar comida para o cachorro", partes: 5, partesTotais: 10, data: "2026-10-11" },
            { id: 4, icone: "https://cdn-icons-png.flaticon.com/512/91/91544.png", nome: "Estudar React", partes: 1, partesTotais: 4, data: "2026-10-13" },
            { id: 5, icone: "https://png.pngtree.com/png-clipart/20250507/original/pngtree-dog-vector-icon-illustration-png-image_20938892.png", nome: "Reunião de Design", partes: 0, partesTotais: 1, data: "2026-10-16" },
        ];

        return tarefas;
    }
}

export async function obterNoticias() {
    let url = "http://rota.com";

    try {
        let response = await axios.get(url);
        await atrasar(TEMPO_ATRASO);
        return response.data;
    } catch (error) {
        console.error(error);
        console.warn("CONTEÚDO ESTÁTICO EM NOTÍCIAS");

        await atrasar(TEMPO_ATRASO);
        const noticias = [
            {
                id: 1,
                imagem: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
                nome: "Vai uma pizza aí? Festa da Pizza na escola!",
                instituicao: "SENAI",
                data: "2026-10-12",
                hora: "14:32",
                url: "/noticia/1"
            },
            {
                id: 2,
                imagem: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
                nome: "Maratona de Programação: Inscrições abertas para o Hackathon 2026",
                instituicao: "SENAI",
                data: "2026-10-13",
                hora: "09:15",
                url: "/noticia/2"
            },
            {
                id: 3,
                imagem: "https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop",
                nome: "Novos equipamentos chegam ao laboratório de Maker",
                instituicao: "ETEC",
                data: "2026-10-10",
                hora: "16:45",
                url: "/noticia/3"
            },
            {
                id: 4,
                imagem: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
                nome: "Palestra sobre Inteligência Artificial aplicada à Indústria",
                instituicao: "ETEC",
                data: "2026-10-08",
                hora: "10:00",
                url: "/noticia/4"
            }
        ];

        return noticias;
    }
}

export async function obterUltimaAtividade() {
    let url = "http://rota.com";

    try {
        let response = await axios.get(url);
        await atrasar(TEMPO_ATRASO);
        return response.data;
    } catch (error) {
        console.error(error);
        console.warn("CONTEÚDO ESTÁTICO EM ÚLTIMA TAREFA");

        await atrasar(TEMPO_ATRASO);
        const ultimaAtividade = {
            imagem: "https://png.pngtree.com/png-clipart/20250507/original/pngtree-dog-vector-icon-illustration-png-image_20938892.png",
            nome: "Pomodoro",
            textoUm: "Ciclo 4 de 5",
            textoDois: "18 min restantes",
            vaiPara: "/pomodoro",
        };

        return ultimaAtividade;
    }
}