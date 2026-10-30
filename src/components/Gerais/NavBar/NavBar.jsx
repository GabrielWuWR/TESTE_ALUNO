import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarBotao from './NavBarBotao/NavBarBotao';
import './NavBar.css';

import iconeNotificacao from '../../../img/icones/navbar/iconeNotificacoes.svg'
import iconeHome from '../../../img/icones/navbar/iconeHome.svg'
import iconeOrganizar from '../../../img/icones/navbar/iconeOrganizar.svg'
import iconeEstudar from '../../../img/icones/navbar/iconeEstudar.svg'
import iconeInstituicao from '../../../img/icones/navbar/iconeInstituicao.svg'
import iconeExercicios from '../../../img/icones/navbar/iconeExercicios.svg'
import iconeConfiguracao from '../../../img/icones/navbar/iconeConfiguracoes.svg'
import iconeConquistas from '../../../img/icones/navbar/iconeConquistas.svg'

const PROFUNDIDADE = 15;
const CURVA = PROFUNDIDADE + 20;
const OFFSET_FECHADO = 106 - PROFUNDIDADE;
const OFFSET_ESCONDIDO = 150;

const bordaCaminho = `M 106 0 C 106 20 95 25 80 25 C ${CURVA} 25 ${PROFUNDIDADE} 40 ${PROFUNDIDADE} 69.5 C ${PROFUNDIDADE} 99 ${CURVA} 114 80 114 C 95 114 106 119 106 139`;
const mascaraCaminho = bordaCaminho + ' Z';
const svgMascara = `<svg width="106" height="139" viewBox="0 0 106 139" xmlns="http://www.w3.org/2000/svg"><path d="${mascaraCaminho}" fill="black"/></svg>`;

function NavBar() {
  const navigate = useNavigate();

  const menuItens = [
  { id: 'home', rota: '/home', icone: iconeHome },
  { id: 'estudar', rota: '/estudar', icone: iconeEstudar },
  { id: 'organizar', rota: '/organizar', icone: iconeOrganizar },
  { id: 'exercicios', rota: '/exercicios', icone: iconeExercicios },
  { id: 'instituicao', rota: '/instituicao', icone: iconeInstituicao },
  { id: 'conquistas', rota: '/conquistas', icone: iconeConquistas }
];

  const [activeId, setActiveId] = useState('home');
  const [maskVisible, setMaskVisible] = useState(true);

  const [maskYCenter, setMaskYCenter] = useState(0);
  const [maskOffsetX, setMaskOffsetX] = useState(0);
  const [animSpeed, setAnimSpeed] = useState('0s');

  const isAnimating = useRef(false);
  const navRef = useRef(null);
  const buttonRefs = useRef({});

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const animarTroca = async (novoId, isCentral, rota) => {
    if (isAnimating.current || novoId === activeId) return;
    if (rota) navigate(rota);

    isAnimating.current = true;

    if (!isCentral) {
      setAnimSpeed('0.35s');
      setMaskOffsetX(OFFSET_ESCONDIDO);
      setActiveId(novoId);
      setMaskVisible(false);
      await wait(350);
      isAnimating.current = false;
      return;
    }

    if (!maskVisible) {
      setActiveId('');
      setAnimSpeed('0s');

      const navRect = navRef.current.getBoundingClientRect();
      const btnRect = buttonRefs.current[novoId].getBoundingClientRect();
      setMaskYCenter((btnRect.top - navRect.top) + (btnRect.height / 2));

      await wait(50);

      setAnimSpeed('0.35s');
      setMaskOffsetX(0);
      setMaskVisible(true);

      await wait(350);

      setActiveId(novoId);
      isAnimating.current = false;
      return;
    }

    setAnimSpeed('0.35s');
    setMaskOffsetX(OFFSET_FECHADO);
    setActiveId('');
    await wait(350);

    setAnimSpeed('0s');
    const navRect = navRef.current.getBoundingClientRect();
    const btnRect = buttonRefs.current[novoId].getBoundingClientRect();
    setMaskYCenter((btnRect.top - navRect.top) + (btnRect.height / 2));
    await wait(20);

    setAnimSpeed('0.35s');
    setMaskOffsetX(0);
    await wait(350);

    setActiveId(novoId);
    isAnimating.current = false;
  };

  useEffect(() => {
    const updatePosition = () => {
      setTimeout(() => {
        if (!navRef.current || !maskVisible || !buttonRefs.current[activeId]) return;
        const navRect = navRef.current.getBoundingClientRect();
        const btnRect = buttonRefs.current[activeId].getBoundingClientRect();

        setAnimSpeed('0s');
        setMaskYCenter((btnRect.top - navRect.top) + (btnRect.height / 2));
        setMaskOffsetX(0);
      }, 50);
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [activeId, maskVisible]);

  return (
    <nav
      className='containerNav'
      ref={navRef}
      style={{
        '--mask-y-center': `${maskYCenter}px`,
        '--mask-offset-x': `${maskOffsetX}px`,
        '--anim-speed': animSpeed,
        '--svg-mask': `url("data:image/svg+xml,${encodeURIComponent(svgMascara)}")`
      }}
    >

      <div className="navVisual">
        <div className="navBackground"></div>
        <div className="navBorder"></div>
      </div>

      <div className="bordaWrapper">
        <svg className="cutoutBorder" width="106" height="139" viewBox="0 0 106 139">
          <defs>
            <linearGradient id="borderGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
            </linearGradient>
          </defs>
          <path d={bordaCaminho} stroke="url(#borderGrad)" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      <NavBarBotao
        icone={iconeNotificacao}
        especial={true}
        ativo={activeId === 'notificacoes'}
        onClick={() => animarTroca('notificacoes', false, '/notificacoes')}
      />

      <div className="containersBotoes">
        {menuItens.map((item) => (
          <NavBarBotao
            key={item.id}
            ref={el => buttonRefs.current[item.id] = el}
            icone={item.icone}
            ativo={activeId === item.id}
            onClick={() => animarTroca(item.id, true, item.rota)}
          />
        ))}
      </div>

      <NavBarBotao
        icone={iconeConfiguracao}
        especial={true}
        ativo={activeId === 'configuracoes'}
        onClick={() => animarTroca('configuracoes', false, '/configuracoes')}
      />
    </nav>
  );
}

export default NavBar;