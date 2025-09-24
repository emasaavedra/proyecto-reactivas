import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="card">
      <h1>Bienvenido a ValoCards</h1>
      <p>
        Construye el equipo de tus sueños con jugadores profesionales de Valorant. Abre sobres, arma tu equipo
        y gana puntos a medida que se desarrollan los partidos reales.
      </p>
      <div className="grid">
        <Link className="btn" to="/packs">Abre un ValoPack</Link>
        <Link className="btn" to="/team">Gestionar Equipo</Link>
        <Link className="btn" to="/leaderboard">Ver Tabla de Clasificación</Link>
        <Link className="btn" to="/profile">Tu Perfil</Link>
      </div>
    </section>
  );
}
