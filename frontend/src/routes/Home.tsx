import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="card">
      <h1>Welcome 👋</h1>
      
      <p>
        Build your fantasy team with real pro players. Open packs, assemble your lineup,
        and climb the leaderboard as real matches play out.
      </p>

      <div className="grid">
        <Link className="btn" to="/packs">Open a Pack</Link>
        <Link className="btn" to="/team">Manage Team</Link>
        <Link className="btn" to="/leaderboard">View Leaderboard</Link>
        <Link className="btn" to="/profile">Your Profile</Link>
      </div>
    </section>
  );
}
