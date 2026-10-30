import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Cabecalho from "../../components/Gerais/Cabecalho/Cabecalho.jsx";
import CardCalendarioTarefas from "../../components/Home/CardCalendarioTarefas/CardCalendarioTarefas.jsx";
import CardFeedNoticias from "../../components/Home/CardFeedNoticias/CardFeedNoticias.jsx";
import CardMomentoBloom from "../../components/Home/CardMomentoBloom/CardMomentoBloom.jsx";
import CardUltimaTarefa from "../../components/Home/CardUltimaTarefa/CardUltimaTarefa.jsx";
import {
  obterFraseAleatoria,
  obterTodasAsTarefas,
  obterNoticias,
  obterUltimaAtividade,
} from "../../js/Rotas_HOME/rotas_HOME.js";
import fotoCapivara from "../../img/Mascote.png";
import "./Home.css";

const cardEntradaVariantes = {
  oculto: { opacity: 0, y: 15, scale: 0.98 },
  visivel: (indice) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: indice * 0.06,
      type: "spring",
      stiffness: 140,
      damping: 18,
    },
  }),
};

function Home() {
  const location = useLocation();

  const animacaoJaTocou = sessionStorage.getItem("animacaoHomeTocou") === "true";
  const dadosJaCarregados = sessionStorage.getItem("dadosHomeCarregados") === "true";

  const usuarioSalvo = useMemo(() => {
    try {
      const salvo = localStorage.getItem("usuarioBloom");
      return salvo ? JSON.parse(salvo) : null;
    } catch {
      return null;
    }
  }, []);

  const usuarioBruto = location.state?.usuario || usuarioSalvo || {};
  const usuario = {
    apelido: usuarioBruto.apelido || "Manoel",
    foto:
      usuarioBruto.foto ||
      usuarioBruto.imagem ||
      usuarioBruto.avatar
  };

  const textoCompleto = "Vamos conversar?";
  const [textoDigitado, setTextoDigitado] = useState("");
  const [estaComMouse, setEstaComMouse] = useState(false);
  const [mostrarChuvaFolhasHome, setMostrarChuvaFolhasHome] = useState(!animacaoJaTocou);

  const [carregandoAPI, setCarregandoAPI] = useState(!dadosJaCarregados);

  const folhasChegada = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => {
        const primeiroPlano = i % 5 === 0;
        return {
          id: i,
          startX: Math.random() * 100,
          balanco1: (Math.random() - 0.5) * 26,
          balanco2: (Math.random() - 0.5) * 26,
          tamanho: primeiroPlano
            ? 95 + Math.random() * 45
            : 50 + Math.random() * 40,
          duracao: 2.4 + Math.random() * 1.5,
          atraso: Math.random() * 0.45,
          rotacaoInicial: Math.random() * 360,
          blur: primeiroPlano ? "blur(3px)" : "none",
        };
      }),
    []
  );

  const bolhasChegada = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        tamanho: 28 + Math.random() * 52,
        duracao: 2.0 + Math.random() * 1.3,
        atraso: Math.random() * 0.4,
      })),
    []
  );

  useEffect(() => {
    if (dadosJaCarregados) {
      setCarregandoAPI(false);
      return;
    }

    let ativo = true;

    async function aguardarDadosHome() {
      setCarregandoAPI(true);
      await Promise.allSettled([
        obterFraseAleatoria(),
        obterUltimaAtividade(),
        obterNoticias(),
        obterTodasAsTarefas(),
        new Promise((resolve) => setTimeout(resolve, 900)),
      ]);

      if (ativo) {
        sessionStorage.setItem("dadosHomeCarregados", "true");
        setCarregandoAPI(false);
      }
    }

    aguardarDadosHome();
    return () => {
      ativo = false;
    };
  }, [dadosJaCarregados]);

  useEffect(() => {
    if (animacaoJaTocou) return;
    sessionStorage.setItem("animacaoHomeTocou", "true");

    const timer = setTimeout(() => {
      setMostrarChuvaFolhasHome(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [animacaoJaTocou]);

  useEffect(() => {
    if (!estaComMouse) {
      setTextoDigitado("");
      return;
    }

    let i = 0;
    setTextoDigitado("");

    const timer = setInterval(() => {
      if (i <= textoCompleto.length) {
        setTextoDigitado(textoCompleto.substring(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 65);

    return () => clearInterval(timer);
  }, [estaComMouse]);

  return (
    <div className="paginaHome">
      <AnimatePresence>
        {mostrarChuvaFolhasHome && (
          <div className="camadaFolhasEntradaHome">
            <motion.div
              className="ondaRevelacaoHome"
              initial={{ scale: 0.4, opacity: 0.75 }}
              animate={{ scale: 2.6, opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />

            {bolhasChegada.map((b) => (
              <motion.div
                key={`bolha-home-${b.id}`}
                className="bolhaChegadaHome"
                style={{
                  width: `${b.tamanho}px`,
                  height: `${b.tamanho}px`,
                  left: `${b.left}vw`,
                }}
                initial={{ bottom: "5vh", opacity: 0.85, scale: 0.7 }}
                animate={{ bottom: "115vh", opacity: 0, scale: 1.25 }}
                transition={{
                  duration: b.duracao,
                  delay: b.atraso,
                  ease: "easeOut",
                }}
              />
            ))}

            {folhasChegada.map((f) => (
              <motion.div
                key={`folha-home-${f.id}`}
                className="folhaChegadaHomeWrapper"
                style={{
                  left: `${f.startX}vw`,
                  width: `${f.tamanho}px`,
                  height: `${f.tamanho}px`,
                  filter: f.blur,
                }}
                initial={{
                  top: "-18vh",
                  opacity: 1,
                  rotateZ: f.rotacaoInicial,
                  rotateX: 0,
                  rotateY: 0,
                }}
                animate={{
                  top: "115vh",
                  x: ["0vw", `${f.balanco1}vw`, `${f.balanco2}vw`],
                  rotateZ: f.rotacaoInicial + 260,
                  rotateX: [0, 180, 360],
                  rotateY: [0, -180, 360],
                  opacity: [1, 0.95, 0],
                }}
                transition={{
                  duration: f.duracao,
                  delay: f.atraso,
                  ease: "easeOut",
                }}
              >
                <svg viewBox="0 0 80 80" className="svgFolhaGrande">
                  <defs>
                    <linearGradient
                      id={`verdeFolhaHome-${f.id}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#a8e063" />
                      <stop offset="50%" stopColor="#56ab2f" />
                      <stop offset="100%" stopColor="#1e6b34" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M72 8 C38 8, 10 26, 10 66 C50 66, 68 38, 72 8 Z"
                    fill={`url(#verdeFolhaHome-${f.id})`}
                    stroke="rgba(255,255,255,0.65)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M6 70 Q40 40 72 8"
                    stroke="rgba(255,255,255,0.85)"
                    strokeWidth="2.4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="34" cy="36" r="4" fill="rgba(255,255,255,0.9)" />
                </svg>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="containerSecao">
        <Cabecalho
          titulo={`Eai ${usuario.apelido} tranquilo?`}
          subtitulo={"Vamos cuidar de você hoje?"}
          voltar={false}
          foto={usuario.foto}
          imagem={usuario.foto}
        />
      </div>

      <div className="containerHome">
        <motion.div
          className="slotCardGrid"
          custom={0}
          variants={cardEntradaVariantes}
          initial={!dadosJaCarregados ? "oculto" : false}
          animate="visivel"
        >
          <div
            className="previewGhostOverlay liquid"
            style={{
              opacity: carregandoAPI ? 1 : 0,
              pointerEvents: carregandoAPI ? "auto" : "none",
            }}
          >
            <div className="shimmerWave" />
            <div className="ghostTopoSimples">
              <div className="ghostBolinhaSimples" />
              <div className="ghostBarraTituloSimples" />
            </div>
            <div className="ghostCorpoSimples">
              <div className="ghostBarraConteudoSimples" />
              <div className="ghostBarraConteudoSimples" style={{ width: "65%" }} />
            </div>
          </div>
          <div style={{ opacity: carregandoAPI ? 0 : 1, height: "100%" }}>
            <CardMomentoBloom />
          </div>
        </motion.div>

        <motion.div
          className="slotCardGrid"
          custom={1}
          variants={cardEntradaVariantes}
          initial={!dadosJaCarregados ? "oculto" : false}
          animate="visivel"
        >
          <div
            className="previewGhostOverlay liquid"
            style={{
              opacity: carregandoAPI ? 1 : 0,
              pointerEvents: carregandoAPI ? "auto" : "none",
            }}
          >
            <div className="shimmerWave" />
            <div className="ghostTopoSimples">
              <div className="ghostBolinhaSimples" />
              <div className="ghostBarraTituloSimples" />
            </div>
            <div className="ghostCorpoSimples">
              <div className="ghostBarraConteudoSimples" />
              <div className="ghostBarraConteudoSimples" style={{ width: "70%" }} />
            </div>
          </div>
          <div style={{ opacity: carregandoAPI ? 0 : 1, height: "100%" }}>
            <CardUltimaTarefa />
          </div>
        </motion.div>

        <motion.div
          className="areaNoticias slotCardGrid"
          custom={2}
          variants={cardEntradaVariantes}
          initial={!dadosJaCarregados ? "oculto" : false}
          animate="visivel"
        >
          <div
            className="previewGhostOverlay liquid"
            style={{
              opacity: carregandoAPI ? 1 : 0,
              pointerEvents: carregandoAPI ? "auto" : "none",
            }}
          >
            <div className="shimmerWave" />
            <div className="ghostTopoSimples">
              <div className="ghostBolinhaSimples" />
              <div className="ghostBarraTituloSimples" />
            </div>
            <div className="ghostCorpoSimples">
              <div className="ghostBarraConteudoSimples" />
              <div className="ghostBarraConteudoSimples" />
              <div className="ghostBarraConteudoSimples" />
              <div className="ghostBarraConteudoSimples" style={{ width: "55%" }} />
            </div>
          </div>
          <div style={{ opacity: carregandoAPI ? 0 : 1, height: "100%" }}>
            <CardFeedNoticias />
          </div>
        </motion.div>

        <motion.div
          className="linhaInferior"
          custom={3}
          variants={cardEntradaVariantes}
          initial={!dadosJaCarregados ? "oculto" : false}
          animate="visivel"
        >
          <div className="slotCalendarioEsquerda">
            <div
              className="previewGhostOverlay liquid"
              style={{
                opacity: carregandoAPI ? 1 : 0,
                pointerEvents: carregandoAPI ? "auto" : "none",
                height: "100%",
              }}
            >
              <div className="shimmerWave" />
              <div className="ghostTopoSimples">
                <div className="ghostBolinhaSimples" />
                <div className="ghostBarraTituloSimples" />
              </div>
              <div className="ghostCorpoSimples">
                <div className="ghostBarraConteudoSimples" />
                <div className="ghostBarraConteudoSimples" style={{ width: "80%" }} />
              </div>
            </div>
            <div style={{ opacity: carregandoAPI ? 0 : 1, height: "100%", width: "100%" }}>
              <CardCalendarioTarefas />
            </div>
          </div>

          <div
            className="containerChat"
            onMouseEnter={() => setEstaComMouse(true)}
            onMouseLeave={() => setEstaComMouse(false)}
          >
            <AnimatePresence>
              {estaComMouse && (
                <motion.div
                  className="containerFala liquid"
                  initial={{ opacity: 0, y: 15, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    x: "-50%",
                    transition: { duration: 0.15 },
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <h1 className="textoGradiente">Oi tudo bem?</h1>
                  <p>{textoDigitado}</p>
                  <div className="caudaBalao"></div>
                </motion.div>
              )}
            </AnimatePresence>
            <img src={fotoCapivara} alt="Mascote Capivara" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;