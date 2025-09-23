export default function Home() {
  return (
    <section className="card">
      <h1>Bienvenido a ValoCards</h1>
      <p>
        Construye el equipo de tus sueños con jugadores profesionales de Valorant. Abre sobres, arma tu equipo
        y gana puntos a medida que se desarrollan los partidos reales.
      </p>
      <div className="grid">
        <a className="btn" href="/packs">Abre un ValoPack</a>
        <a className="btn" href="/team">Gestionar Equipo</a>
        <a className="btn" href="/leaderboard">Ver Tabla de Clasificación</a>
        <a className="btn" href="/profile">Tu Perfil</a>
      </div>
    </section>
  );
}
