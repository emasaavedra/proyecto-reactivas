import { Outlet, NavLink } from "react-router-dom";
import "./App.css";

export default function App() {
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
