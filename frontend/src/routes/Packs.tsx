import { useState } from "react";

type Card = { id: string; name: string; role: "Duelist" | "Initiator" | "Controller" | "Sentinel"; rating: number };

export default function Packs() {
  const [cards, setCards] = useState<Card[] | null>(null);

  // Placeholder "open pack" — replace later with backend call
  const openPack = () => {
    const demo: Card[] = [
      { id: crypto.randomUUID(), name: "PRX f0rsakeN", role: "Duelist", rating: 92 },
      { id: crypto.randomUUID(), name: "SEN TenZ", role: "Duelist", rating: 90 },
      { id: crypto.randomUUID(), name: "LOUD saadhak", role: "Initiator", rating: 88 },
      { id: crypto.randomUUID(), name: "FNATIC Boaster", role: "Controller", rating: 86 },
      { id: crypto.randomUUID(), name: "TL Nats", role: "Sentinel", rating: 89 },
    ];
    setCards(demo.sort(() => 0.5 - Math.random()).slice(0, 3));
  };

  return (
    <section className="card">
      <h1>Open a Pack</h1>
      
      <p>Get 3 random player cards. (Demo data for now.)</p>
      
      <button className="btn primary" onClick={openPack}>Open</button>

      {cards && (
        <div className="cards">
          {cards.map((c) => (
            <article key={c.id} className="player-card">
              <header>
                <strong>{c.name}</strong>
                <span className="role">{c.role}</span>
              </header>
              <div className="rating">OVR {c.rating}</div>
              <button className="btn small">Add to Collection</button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
