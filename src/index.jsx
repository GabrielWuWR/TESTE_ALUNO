import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./css/global.css";
import MainLayout from "./components/Gerais/Layouts/MainLayout.jsx";
import Home from "./pages/HOME/Home.jsx";
import Autenticar from "./pages/AUTENTICACAO/Autenticacao.jsx";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID;

window.fbAsyncInit = function() {
  window.FB.init({
    appId      : facebookAppId,
    cookie     : true,
    xfbml      : true,
    version    : 'v18.0'
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/pt_BR/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

const RotaProtegida = () => {
  const logado = localStorage.getItem("usuarioBloom");
  return logado ? <Outlet /> : <Navigate to="/login" replace />;
};

const RotaInicial = () => {
  const logado = localStorage.getItem("usuarioBloom");
  return logado ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

const RotaLogin = () => {
  const logado = localStorage.getItem("usuarioBloom");
  return logado ? <Navigate to="/home" replace /> : <Autenticar />;
};

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RotaInicial />} />
        <Route element={<RotaProtegida />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/estudar" element={<h1>Página Estudar</h1>} />
            <Route path="/organizar" element={<h1>Página Organizar</h1>} />
            <Route path="/exercicios" element={<h1>Página Exercícios</h1>} />
            <Route path="/instituicao" element={<h1>Página Instituição</h1>} />
            <Route path="/conquistas" element={<h1>Página Conquistas</h1>} />
            <Route path="/notificacoes" element={<h1>Página Notificações</h1>} />
            <Route
              path="/configuracoes"
              element={<h1>Página Configurações</h1>}
            />
          </Route>
        </Route>

        <Route path="/login" element={<RotaLogin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>
);