import { useState } from "react";
import packsService from "../services/packsService";
import packComponent from "../components/pack";
import type { Pack } from "../types/Packs";

export default function Packs() {
  const [pack, setPack] = useState<Pack | null>(null);
  const [loading, setLoading] = useState(false);

  // Abrir pack usando el servicio real
  const openPack = async () => {
    setLoading(true);
    setPack(null); // 🔥 LIMPIAR el pack anterior primero
    try {
      const newPack = await packsService.openDefaultPack();
      setPack(newPack);
    } catch (error) {
      console.error("Error opening pack:", error);
    } finally {
      setLoading(false);
    }
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
