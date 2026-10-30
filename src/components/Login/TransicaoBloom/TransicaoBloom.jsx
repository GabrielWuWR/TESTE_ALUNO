import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./TransicaoBloom.css";

function TransicaoBloom({ ativo, apelido, aoFinalizar }) {
  const [ato, setAto] = useState(0);

  useEffect(() => {
    if (!ativo) {
      setAto(0);
      return;
    }

    setAto(1);

    const timerAto2 = setTimeout(() => setAto(2), 4600);
    const timerAto3 = setTimeout(() => setAto(3), 8200);
    const timerAto4 = setTimeout(() => setAto(4), 12200);
    const timerFim = setTimeout(() => {
      if (aoFinalizar) aoFinalizar();
    }, 13600);

    return () => {
      clearTimeout(timerAto2);
      clearTimeout(timerAto3);
      clearTimeout(timerAto4);
      clearTimeout(timerFim);
    };
  }, [ativo, aoFinalizar]);

  const folhas = useMemo(
    () =>
      Array.from({ length: 32 }).map((_, i) => {
        const camada = i % 3;
        return {
          id: i,
          startX: Math.random() * 100,
          balanco1: (Math.random() - 0.5) * 42,
          balanco2: (Math.random() - 0.5) * 42,
          tamanho:
            camada === 2
              ? 115 + Math.random() * 45
              : camada === 1
                ? 65 + Math.random() * 35
                : 38 + Math.random() * 25,
          duracao:
            camada === 2
              ? 9.5 + Math.random() * 4.0
              : 11.5 + Math.random() * 4.5,
          atraso: Math.random() * 4.5,
          rotacaoInicial: Math.random() * 360,
          blurProfundidade:
            camada === 2 ? "blur(4px)" : camada === 0 ? "blur(2px)" : "none",
          zIndex: camada === 2 ? 15 : 5,
        };
      }),
    [],
  );

  const bolhas = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        tamanho: 25 + Math.random() * 75,
        desvioX: (Math.random() - 0.5) * 32,
        duracao: 8.5 + Math.random() * 4.5,
        atraso: Math.random() * 4.0,
      })),
    [],
  );

  const particulas = useMemo(
    () =>
      Array.from({ length: 48 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        tamanho: 4 + Math.random() * 10,
        duracao: 6.0 + Math.random() * 3.5,
        atraso: Math.random() * 4.0,
      })),
    [],
  );

  const explosaoBloom = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => {
        const angulo = (i / 22) * Math.PI * 2;
        const distancia = 160 + Math.random() * 280;
        return {
          id: i,
          tx: Math.cos(angulo) * distancia,
          ty: Math.sin(angulo) * distancia,
          rot: Math.random() * 360,
          escala: 0.7 + Math.random() * 0.8,
        };
      }),
    [],
  );

  const petalasExternas = useMemo(
    () => Array.from({ length: 12 }, (_, i) => i * 30),
    [],
  );
  const petalasInternas = useMemo(
    () => Array.from({ length: 8 }, (_, i) => i * 45 + 22.5),
    [],
  );

  const palavrasSaudacao = `Eai ${apelido || ""}, tudo bem?`.split(" ");
  const palavrasBemVindo = "Bem-vindo novamente ao".split(" ");
  const letrasBloom = "Bloom".split("");

  return (
    <AnimatePresence>
      {ativo && (
        <motion.div
          className="overlayLiquidTransicao"
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{
            opacity: 1,
            backdropFilter:
              ato === 4 ? "blur(55px)" : ato >= 2 ? "blur(34px)" : "blur(22px)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        >
          <div className="vinhetaCinematografica" />

          <motion.div
            className="feixesLuzContainer"
            initial={{ opacity: 0, rotate: -15, scale: 0.85 }}
            animate={{
              opacity: [0, 0.85, 0.7, 0.95, 0],
              rotate: [-15, -6, 2],
              scale: [0.85, 1.08, 1.25],
            }}
            transition={{ duration: 13.5, ease: "easeInOut" }}
          >
            <div className="feixeSolar feixe1" />
            <div className="feixeSolar feixe2" />
            <div className="feixeSolar feixe3" />
          </motion.div>

          <svg
            className="svgCiposMoldura"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="gradCipoLuz"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(184, 242, 114, 0.85)" />
                <stop offset="50%" stopColor="rgba(86, 171, 47, 0.55)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M -20,1080 C 220,860 180,580 460,440 C 640,350 760,480 960,540"
              fill="none"
              stroke="url(#gradCipoLuz)"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.8, 0.4, 0] }}
              transition={{ duration: 11.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M 1940,0 C 1700,220 1740,500 1460,640 C 1280,730 1160,600 960,540"
              fill="none"
              stroke="url(#gradCipoLuz)"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.8, 0.4, 0] }}
              transition={{ duration: 11.5, delay: 0.4, ease: "easeInOut" }}
            />
          </svg>

          <motion.div
            key={`ripple-${ato}`}
            className="anelOndaLiquid"
            initial={{ scale: 0.1, opacity: 0.9 }}
            animate={{ scale: 3.6, opacity: 0 }}
            transition={{ duration: 4.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            key={`ripple-sec-${ato}`}
            className="anelOndaLiquid secundario"
            initial={{ scale: 0.1, opacity: 0.65 }}
            animate={{ scale: 2.9, opacity: 0 }}
            transition={{
              duration: 4.4,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          <motion.div
            className="grandeElementoFlorWrapper"
            initial={{ scale: 0.25, opacity: 0, rotate: -45 }}
            animate={{
              scale:
                ato === 1 ? 0.68 : ato === 2 ? 1.08 : ato === 3 ? 1.48 : 9.5,
              opacity: ato === 4 ? [1, 1, 0] : [0, 0.95, 1],
              rotate: ato === 4 ? 110 : ato * 28,
            }}
            transition={{
              duration: ato === 4 ? 1.5 : 3.8,
              ease: ato === 4 ? [0.7, 0, 0.84, 0] : [0.16, 1, 0.3, 1],
            }}
          >
            <svg viewBox="-200 -200 400 400" className="svgGrandeFlorBloom">
              <defs>
                <radialGradient id="brilhoNucleoFlor" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
                  <stop offset="45%" stopColor="rgba(198, 255, 145, 0.85)" />
                  <stop offset="100%" stopColor="rgba(86, 171, 47, 0)" />
                </radialGradient>
                <linearGradient
                  id="petalaVidroExterna"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.92)" />
                  <stop offset="35%" stopColor="rgba(184, 242, 114, 0.45)" />
                  <stop offset="100%" stopColor="rgba(46, 125, 50, 0.18)" />
                </linearGradient>
                <linearGradient
                  id="petalaVidroInterna"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.98)" />
                  <stop offset="60%" stopColor="rgba(220, 255, 175, 0.65)" />
                  <stop offset="100%" stopColor="rgba(86, 171, 47, 0.3)" />
                </linearGradient>
              </defs>

              <motion.circle
                cx="0"
                cy="0"
                r="165"
                fill="none"
                stroke="rgba(255, 255, 255, 0.55)"
                strokeWidth="1.2"
                strokeDasharray="6 8"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                  scale: ato >= 2 ? 1.05 : 0.75,
                  opacity: ato >= 2 ? 0.75 : 0.3,
                  rotate: 360,
                }}
                transition={{ duration: 14, ease: "linear" }}
              />

              {petalasExternas.map((angulo, idx) => (
                <g key={`ext-${angulo}`} transform={`rotate(${angulo})`}>
                  <motion.path
                    d="M 0,0 C -36,-45 -44,-115 0,-158 C 44,-115 36,-45 0,0 Z"
                    fill="url(#petalaVidroExterna)"
                    stroke="rgba(255, 255, 255, 0.85)"
                    strokeWidth="1.5"
                    initial={{ scaleY: 0.15, scaleX: 0.2, opacity: 0 }}
                    animate={{
                      scaleY: ato === 1 ? 0.35 : ato === 2 ? 0.88 : 1.12,
                      scaleX: ato === 1 ? 0.35 : ato === 2 ? 0.92 : 1.15,
                      opacity: ato === 1 ? 0.45 : 0.92,
                    }}
                    transition={{
                      duration: 2.8,
                      delay: idx * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </g>
              ))}

              {petalasInternas.map((angulo, idx) => (
                <g key={`int-${angulo}`} transform={`rotate(${angulo})`}>
                  <motion.path
                    d="M 0,0 C -26,-32 -30,-82 0,-112 C 30,-82 26,-32 0,0 Z"
                    fill="url(#petalaVidroInterna)"
                    stroke="rgba(255, 255, 255, 0.95)"
                    strokeWidth="1.8"
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{
                      scale: ato === 1 ? 0.55 : ato === 2 ? 0.95 : 1.22,
                      opacity: 0.95,
                    }}
                    transition={{
                      duration: 2.6,
                      delay: 0.2 + idx * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </g>
              ))}

              <motion.circle
                cx="0"
                cy="0"
                r="52"
                fill="url(#brilhoNucleoFlor)"
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.85, 1, 0.85],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </motion.div>

          {particulas.map((p) => (
            <motion.div
              key={`part-${p.id}`}
              className="particulaLuzBloom"
              style={{
                width: `${p.tamanho}px`,
                height: `${p.tamanho}px`,
                top: `${p.top}vh`,
                left: `${p.left}vw`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.95, 0.4, 0.95, 0],
                scale: [0, 1.4, 0.9, 1.65, 0],
                y: [0, -90, -180],
              }}
              transition={{
                duration: p.duracao,
                delay: p.atraso,
                ease: "easeInOut",
              }}
            />
          ))}

          {bolhas.map((b) => (
            <motion.div
              key={`bolha-${b.id}`}
              className="bolhaGrandeLiquid"
              style={{
                width: `${b.tamanho}px`,
                height: `${b.tamanho}px`,
                left: `${b.left}vw`,
              }}
              initial={{ bottom: "-20vh", opacity: 0, scale: 0.4 }}
              animate={{
                bottom: "120vh",
                x: [`0vw`, `${b.desvioX}vw`, `${-b.desvioX * 0.7}vw`],
                opacity: [0, 0.85, 0.85, 0],
                scale: [0.4, 1.05, 1.25, 0.85],
              }}
              transition={{
                duration: b.duracao,
                delay: b.atraso,
                ease: "easeInOut",
              }}
            />
          ))}

          {folhas.map((f) => (
            <motion.div
              key={`folha-${f.id}`}
              className="folhaArvoreWrapper"
              style={{
                left: `${f.startX}vw`,
                width: `${f.tamanho}px`,
                height: `${f.tamanho}px`,
                filter: f.blurProfundidade,
                zIndex: f.zIndex,
              }}
              initial={{
                top: "-24vh",
                opacity: 0,
                rotateZ: f.rotacaoInicial,
                rotateX: 0,
                rotateY: 0,
              }}
              animate={{
                top: "120vh",
                x: [
                  "0vw",
                  `${f.balanco1}vw`,
                  `${f.balanco2}vw`,
                  `${f.balanco1 * 0.5}vw`,
                ],
                rotateZ: [
                  f.rotacaoInicial,
                  f.rotacaoInicial + 55,
                  f.rotacaoInicial - 45,
                  f.rotacaoInicial + 195,
                ],
                rotateX: [0, 160, 300, 360],
                rotateY: [0, -160, 160, 360],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: f.duracao,
                delay: f.atraso,
                ease: "easeInOut",
              }}
            >
              <svg viewBox="0 0 80 80" className="svgFolhaGrande">
                <defs>
                  <linearGradient
                    id={`verdeFolha-${f.id}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#b8f272" />
                    <stop offset="50%" stopColor="#56ab2f" />
                    <stop offset="100%" stopColor="#1e6b34" />
                  </linearGradient>
                  <linearGradient
                    id={`reflexoFolha-${f.id}`}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M72 8 C38 8, 10 26, 10 66 C50 66, 68 38, 72 8 Z"
                  fill={`url(#verdeFolha-${f.id})`}
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="1.5"
                />
                <path
                  d="M68 12 C40 12, 18 25, 15 52 C32 40, 52 24, 68 12 Z"
                  fill={`url(#reflexoFolha-${f.id})`}
                />
                <path
                  d="M6 70 Q40 40 72 8"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="2.4"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M28 50 Q26 36 38 28 M44 36 Q42 24 54 18"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="34" cy="36" r="4" fill="rgba(255,255,255,0.95)" />
              </svg>
            </motion.div>
          ))}

          <div className="palcoTextoTransicao">
            <AnimatePresence mode="wait">
              {ato === 1 && (
                <motion.div
                  key="ato-1-saudacao"
                  className="blocoFraseAnimada"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    y: -30,
                    scale: 1.04,
                    filter: "blur(16px)",
                    transition: { duration: 1.1, ease: "easeInOut" },
                  }}
                >
                  <div className="haloContrasteFundo" />
                  <div className="linhaPalavrasSaudacao">
                    {palavrasSaudacao.map((palavra, idx) => (
                      <motion.span
                        key={idx}
                        className="textoGradiente palavraSaudacaoSite"
                        initial={{
                          opacity: 0,
                          y: 42,
                          scale: 0.82,
                          rotateX: -35,
                          filter: "blur(14px)",
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          rotateX: 0,
                          filter: "blur(0px)",
                        }}
                        transition={{
                          delay: 0.35 + idx * 0.24,
                          duration: 1.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {palavra}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {(ato === 2 || ato === 3) && (
                <motion.div
                  key="ato-2-3-bloom"
                  className="blocoFraseAnimada"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 1.35,
                    filter: "blur(24px)",
                    transition: { duration: 1.15, ease: "easeInOut" },
                  }}
                >
                  <div className="haloContrasteFundo" />

                  <div className="linhaPalavrasMenores">
                    {palavrasBemVindo.map((palavra, idx) => (
                      <motion.span
                        key={idx}
                        className="palavraBemVindo"
                        initial={{
                          opacity: 0,
                          y: 26,
                          filter: "blur(10px)",
                        }}
                        animate={{
                          opacity: ato === 3 ? 0.85 : 1,
                          y: ato === 3 ? -6 : 0,
                          filter: "blur(0px)",
                        }}
                        transition={{
                          delay: 0.15 + idx * 0.22,
                          duration: 1.15,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {palavra}
                      </motion.span>
                    ))}
                  </div>

                  <AnimatePresence>
                    {ato === 3 && (
                      <motion.div
                        className="containerPalavraBloomRelativo"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {explosaoBloom.map((item) => (
                          <motion.div
                            key={`burst-${item.id}`}
                            className="particulaFolhaBurst"
                            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                            animate={{
                              x: item.tx,
                              y: item.ty,
                              scale: [0, item.escala, 0],
                              rotate: item.rot + 220,
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              delay: 0.35,
                              duration: 3.1,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          />
                        ))}

                        <motion.div
                          className="linhaPalavraBloom"
                          initial={{ gap: "0.05rem" }}
                          animate={{ gap: "0.45rem" }}
                          transition={{ duration: 3.4, ease: "easeOut" }}
                        >
                          {letrasBloom.map((letra, idx) => (
                            <motion.span
                              key={idx}
                              className="textoGradiente letraDestaqueBloomSite"
                              initial={{
                                opacity: 0,
                                y: 55,
                                scale: 0.45,
                                filter: "blur(16px)",
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                filter: "blur(0px)",
                              }}
                              transition={{
                                delay: 0.15 + idx * 0.16,
                                duration: 1.3,
                                type: "spring",
                                stiffness: 90,
                                damping: 14,
                              }}
                            >
                              {letra}
                            </motion.span>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TransicaoBloom;
