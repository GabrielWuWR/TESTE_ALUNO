import { useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '../NavBar/NavBar.jsx';
import AcessoRapido from '../AcessoRapido/AcessoRapido.jsx';
import './MainLayout.css';

function MainLayout() {
  const location = useLocation();
  const currentOutlet = useOutlet(); 

  return (
    <main className="containerGlobal">
      <AcessoRapido />
      <NavBar />
      
      <div className="conteudoPagina">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: "easeInOut" 
            }}
            style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column'
            }}
          >
            {currentOutlet} 
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

export default MainLayout;