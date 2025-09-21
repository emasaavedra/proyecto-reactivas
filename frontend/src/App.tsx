import { Outlet, NavLink } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <div className="layout">
      <header className="nav">
        <div className="brand">Valorant Fantasy ⚡</div>
        <nav className="links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/packs">Packs</NavLink>
          <NavLink to="/team">My Team</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/players">Players</NavLink>
          <NavLink to="/tournaments">Torneos</NavLink>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer className="footer">
        <small>React + TS + Vite • HMR on save</small>
      </footer>
    </div>
  );
}
