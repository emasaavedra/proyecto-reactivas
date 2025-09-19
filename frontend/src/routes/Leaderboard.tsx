const rows = [
  { user: "Pablo", points: 1275 },
  { user: "Emanuel", points: 1190 },
  { user: "Benjamín", points: 1105 },
];

export default function Leaderboard() {
  return (
    <section className="card">
      <h1>Leaderboard</h1>
      <table className="table">
        <thead><tr><th>User</th><th>Points</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.user}><td>{r.user}</td><td>{r.points}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
