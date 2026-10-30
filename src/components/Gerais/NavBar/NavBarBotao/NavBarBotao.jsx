import { forwardRef } from 'react';
import './NavBarBotao.css';

const NavBarBotao = forwardRef(({ icone, especial = false, ativo, onClick }, ref) => {
    if (especial === false) {
        return (
            <div 
                ref={ref} 
                className={`containerBotao ${ativo ? 'mostrar-balao selecionado' : ''}`} 
                onClick={onClick}
            >
                <img src={icone} alt="" />
            </div>
        );
    } else {
        return (
            <div 
                className={`containerBotao menuDiferente ${ativo ? 'ativo' : ''}`} 
                onClick={onClick}
            >
                <img src={icone} alt="" />
            </div>
        );
    }
});

export default NavBarBotao;