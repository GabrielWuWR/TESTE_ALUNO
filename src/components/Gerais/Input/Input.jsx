import { useState } from "react";
import Icone from "../Icone/Icone";
import "./Input.css";
import iconeCadeado from "../../../img/icones/cadeadoBrancoIcone.svg";
import iconeOlho from "../../../img/icones/olhoBrancoIcone.svg";
import iconeOlhoFechado from "../../../img/icones/olhoFechadoBrancoIcone.svg";
import iconeEmail from "../../../img/icones/emailIcone.svg";
import iconePhone from "../../../img/icones/telefoneIcone.svg";
import { motion } from "framer-motion";

function Input({
  placeholder,
  tipo,
  classeName,
  imagem,
  valor,
  aoAlterar,
  erro, 
  aoPressionarTecla,
  aoLidarErro,
  aoPerderFoco,
  minimo,
  maximo,
  quantidade
}) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const validarFormatoEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const formatarTelefone = (valor) => {
    if (!valor) return "";
    let v = valor.replace(/\D/g, "");
    v = v.substring(0, 11);

    if (v.length > 10) {
      v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (v.length > 6) {
      v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (v.length > 2) {
      v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else if (v.length > 0) {
      v = v.replace(/^(\d*)/, "($1");
    }
    return v;
  };

  if (tipo === "email") {
    const lidarAlteracaoEmail = (e) => {
      if (aoAlterar) aoAlterar(e);
    };

    const lidarPerderFocoEmail = (e) => {
      const valorAtual = e.target.value;
      if (aoLidarErro) {
        if (valorAtual.trim() === "") {
          aoLidarErro("vazio");
        } else if (!validarFormatoEmail(valorAtual)) {
          aoLidarErro("formato_invalido");
        } else {
          aoLidarErro("valido");
        }
      }
      if (aoPerderFoco) aoPerderFoco(e);
    };

    return (
      <motion.div
        animate={erro ? { x: [-8, 8, -5, 5, -2, 2, 0] } : { x: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`containerInput ${classeName || ""} ${erro ? "campo-invalido" : ""}`}
      >
        <Icone className="iconeInput" imagem={iconeEmail} altura={"2.7rem"} largura={"2.7rem"} />
        <input
          type="email"
          className="liquid"
          placeholder={placeholder}
          value={valor}
          onChange={lidarAlteracaoEmail}
          onBlur={lidarPerderFocoEmail}
          onKeyDown={aoPressionarTecla}
          spellCheck={false}
          maxLength={maximo}
        />
      </motion.div>
    );
  } 

  else if (tipo === "texto") {
    const lidarAlteracaoTexto = (e) => {
      if (aoAlterar) aoAlterar(e);
    };

    const lidarPerderFocoTexto = (e) => {
      const valorAtual = e.target.value;
      if (aoLidarErro && minimo !== undefined) {
        if (valorAtual.trim() === "" || valorAtual.length < minimo) {
          aoLidarErro("minimo_nao_atingido");
        } else {
          aoLidarErro("valido");
        }
      }
      if (aoPerderFoco) aoPerderFoco(e);
    };

    return (
      <motion.div
        animate={erro ? { x: [-8, 8, -5, 5, -2, 2, 0] } : { x: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`containerInput ${classeName || ""} ${erro ? "campo-invalido" : ""}`}
      >
        <Icone className="iconeInput" imagem={imagem} altura={"2.7rem"} largura={"2.7rem"} />
        <input
          type="text"
          className="liquid"
          placeholder={placeholder}
          value={valor}
          onChange={lidarAlteracaoTexto}
          onBlur={lidarPerderFocoTexto}
          onKeyDown={aoPressionarTecla}
          spellCheck={false}
          minLength={minimo}
          maxLength={maximo}
        />
      </motion.div>
    );
  } 

  else if (tipo === "phone") {
    const lidarAlteracaoTelefone = (e) => {
      e.target.value = formatarTelefone(e.target.value);
      if (aoAlterar) aoAlterar(e);
    };

    const lidarPerderFocoTelefone = (e) => {
      const valorAtual = e.target.value;
      if (aoLidarErro) {
        if (valorAtual.trim() === "" || valorAtual.length < 14) {
          aoLidarErro("invalido");
        } else {
          aoLidarErro("valido");
        }
      }
      if (aoPerderFoco) aoPerderFoco(e);
    };

    return (
      <motion.div
        animate={erro ? { x: [-8, 8, -5, 5, -2, 2, 0] } : { x: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`containerInput ${classeName || ""} ${erro ? "campo-invalido" : ""}`}
      >
        <Icone className="iconeInput" imagem={imagem || iconePhone} altura={"2.7rem"} largura={"2.7rem"} />
        <input
          type="tel"
          className="liquid"
          placeholder={placeholder}
          value={valor}
          onChange={lidarAlteracaoTelefone}
          onBlur={lidarPerderFocoTelefone}
          onKeyDown={aoPressionarTecla}
          spellCheck={false}
          maxLength={15}
        />
      </motion.div>
    );
  } 
  
  else if (tipo === "senha") {
    return (
      <motion.div
        animate={erro ? { x: [-8, 8, -5, 5, -2, 2, 0] } : { x: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`containerInput ${classeName || ""} ${erro ? "campo-invalido" : ""}`}
      >
        <Icone className="iconeInput" imagem={imagem || iconeCadeado} altura={"2.7rem"} largura={"2.7rem"} />
        <input
          type={mostrarSenha ? "text" : "password"}
          className="liquid"
          placeholder={placeholder}
          value={valor}
          onChange={aoAlterar}
          onBlur={aoPerderFoco}
          onKeyDown={aoPressionarTecla}
          minLength={minimo}
          maxLength={maximo}
        />
        <button
          type="button"
          className="botaoVerSenha"
          onClick={() => setMostrarSenha(!mostrarSenha)}
        >
          <Icone
            imagem={mostrarSenha ? iconeOlho : iconeOlhoFechado}
            altura={"2.4rem"}
            largura={"2.4rem"}
          />
        </button>
      </motion.div>
    );
  }

  else if (tipo === "caracteres") {
    const qtd = quantidade || 4;
    const stringValor = typeof valor === "string" ? valor : "";
    const valoresArray = Array.from({ length: qtd }, (_, i) => stringValor[i] || "");
  
    const lidarMudancaChar = (e, index) => {
      const textoEntrada = e.target.value; 
      let novoValorArr = stringValor.split("");
  
      if (textoEntrada.length > 0) {
        novoValorArr[index] = textoEntrada[textoEntrada.length - 1];
      } else {
        novoValorArr[index] = "";
      }
  
      const valorFinal = novoValorArr.join("").slice(0, qtd);
  
      if (aoAlterar) {
        aoAlterar({ target: { value: valorFinal } });
      }
  
      if (textoEntrada.length > 0 && index < qtd - 1) {
        const containerPai = e.target.closest(".containerGrupoCaracteres");
        const inputs = containerPai?.querySelectorAll("input");
        setTimeout(() => inputs?.[index + 1]?.focus(), 10);
      }
    };
  
    const lidarKeyDownChar = (e, index) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        let arr = stringValor.split("");
        
        if (arr[index]) {
          arr[index] = "";
        } else if (index > 0) {
          arr[index - 1] = "";
          const containerPai = e.target.closest(".containerGrupoCaracteres");
          const inputs = containerPai?.querySelectorAll("input");
          inputs?.[index - 1]?.focus();
        }
  
        const valorFinal = arr.join("");
        if (aoAlterar) {
          aoAlterar({ target: { value: valorFinal } });
        }
      }
      if (aoPressionarTecla) aoPressionarTecla(e);
    };
  
    const lidarColarChar = (e) => {
      e.preventDefault();
      const textoColado = e.clipboardData.getData("text").slice(0, qtd);
  
      if (aoAlterar) {
        aoAlterar({ target: { value: textoColado } });
      }
  
      const containerPai = e.target.closest(".containerGrupoCaracteres");
      const inputs = containerPai?.querySelectorAll("input");
      const proximoIndex = Math.min(textoColado.length, qtd - 1);
      setTimeout(() => inputs?.[proximoIndex]?.focus(), 10);
    };
  
    return (
      <motion.div
        animate={erro ? { x: [-8, 8, -5, 5, -2, 2, 0] } : { x: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`containerGrupoCaracteres ${classeName || ""}`}
      >
        {valoresArray.map((val, index) => (
          <div key={index} className={`containerInput containerInputChar ${erro ? "campo-invalido" : ""}`}>
            <input
              type="text"
              inputMode="text" 
              className="liquid inputChar"
              value={val}
              onChange={(e) => lidarMudancaChar(e, index)}
              onKeyDown={(e) => lidarKeyDownChar(e, index)}
              onPaste={lidarColarChar}
              maxLength={2}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        ))}
      </motion.div>
    );
  }
  
}

export default Input;