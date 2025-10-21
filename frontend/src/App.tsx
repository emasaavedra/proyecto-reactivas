import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import authService from "./services/login";
import type { User } from "./types/User";
import "./App.css";

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.restoreLogin();
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <div className="layout">
      <header className="nav">
        <NavLink to="/" end><div className="brand"> 🃏 ValoFantasy 🃏 </div></NavLink>
        <nav className="links">
          <NavLink to="/packs">ValoPacks</NavLink>
          <NavLink to="/team">Mi Equipo</NavLink>
          <NavLink to="/leaderboard">Tabla de Puntos</NavLink>
          <NavLink to="/profile">Perfil</NavLink>
          <NavLink to="/players">Lista de Jugadores</NavLink>
          <NavLink to="/tournaments">Torneos</NavLink>
          
          {currentUser ? (
            <>
              <span style={{ color: "#00d4ff", padding: "0 1rem" }}>
                👤 {currentUser.username}
              </span>
              <button onClick={handleLogout} className="btn" style={{ fontSize: "0.9rem", padding: "0.3rem 0.8rem" }}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <NavLink to="/login">Iniciar Sesión</NavLink>
          )}
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer className="footer">
        <small></small>
      </footer>
    </div>
  );
}
