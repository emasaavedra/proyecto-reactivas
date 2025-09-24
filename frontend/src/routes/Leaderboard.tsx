const rows = [
  { user: "Emanuel", points: 1390 },
  { user: "Pablo", points: 1275 },
  { user: "Benjamín", points: 1105 },
];

export default function Leaderboard() {
  return (
    <section className="card">
      <h1>Tabla de Puntos</h1>
      <table className="table">
        <thead><tr><th>Usuario</th><th>Puntos</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.user}><td>{r.user}</td><td>{r.points}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
