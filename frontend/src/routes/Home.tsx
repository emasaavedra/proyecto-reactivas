export default function Home() {
  return (
    <section className="card">
      <h1>Welcome 👋</h1>
      <p>
        Build your fantasy team with real pro players. Open packs, assemble your lineup,
        and climb the leaderboard as real matches play out.
      </p>
      <div className="grid">
        <a className="btn" href="/packs">Open a Pack</a>
        <a className="btn" href="/team">Manage Team</a>
        <a className="btn" href="/leaderboard">View Leaderboard</a>
        <a className="btn" href="/profile">Your Profile</a>
      </div>
    </section>
  );
}
