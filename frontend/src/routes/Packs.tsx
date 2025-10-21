import { useState } from "react";
import packsService from "../services/packsService";
import sobres from "../components/pack";
import type { Pack } from "../types/Packs";

export default function Packs() {
  const [pack, setPack] = useState<Pack | null>(null);
  const [loading, setLoading] = useState(false);

  // Abrir pack usando el servicio real
  const openPack = async () => {
    setLoading(true);
    setPack(null); 
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
      <h1>ValoPacks</h1>
      <p>Abre un Pack para conseguir 5 cartas de ValoPlayers !!</p>
      <button className="btn primary" onClick={openPack} disabled={loading}>
        {loading ? "Abriendo..." : "Abrir Pack"}
      </button>

      {pack && (
        <div className="pack-result">
          {sobres(pack)}
        </div>
      )}
    </section>
  );
}
