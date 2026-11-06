// PASO 1 · COPIAR (ya anda con lo provisorio)  ·  PASO 4 · PEGAR HTML (header, saludo, footer)
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { LoginForm } from "./LoginForm.jsx";

export function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Si hay usuario se ve el saludo; si no, el formulario de login (ya está hecho, no se toca)
  const areaLogin = user ? (
    <>
      <div id="userInfo">
        <span id="userNameDisplay">
          Bienvenido, {user.fullname} - {user.rol}
        </span>
        <button
          id="logoutBtn"
          className="btn-quilmes-secondary"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </>
  ) : (
    <LoginForm />
  );

  return (
    <>
      <header>
        <div className="brand-container">
          <h1 className="logo-title">🍻💪 BIRRA Y BÍCEPS</h1>
          <p className="slogan">Porque la vida es equilibrio.</p>
        </div>
        <div className="login-container" id="login-container">
          {areaLogin}
        </div>
      </header>
      <footer>
        <p>
          🍻 Birra y Bíceps © 2025 - Gimnasio con Actitud | Bebe con
          Responsabilidad 🍺
        </p>
      </footer>
    </>
  );
}
