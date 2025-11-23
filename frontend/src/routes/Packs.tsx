import { useState } from "react";
import packsService from "../services/packsService";
import Player from "../components/player";
import PlayerModal from "../components/playerModal";
import type { Pack } from "../types/Packs";
import type { IPlayer } from "../types/Player";
import { addPlayersToUser } from "../services/userService";

export default function Packs() {
  const [pack, setPack] = useState<Pack | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);

  const openPack = async () => {
    setLoading(true);
    setPack(null); 
    try {
      const newPack = await packsService.openDefaultPack();
      setPack(newPack);
      await addPlayersToUser(newPack.players.map(p => p.id));
    } catch (error) {
      console.error("Error opening pack:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h1>ValoPacks</h1>
      <p>Abre un Pack para conseguir 4 cartas de ValoPlayers !!</p>
      <button className="btn primary" onClick={openPack} disabled={loading}>
        {loading ? "Abriendo..." : "Abrir Pack"}
      </button>

      {pack && (
        <div className="players-grid">
          {pack.players.slice(0, 4).map((p, idx) => (
            <div
              key={p.id ?? idx}
              onClick={() => setSelectedPlayer(p)}
              style={{ cursor: "pointer" }}
            >
              <Player player={p} />
            </div>
          ))}
          {selectedPlayer && (
            <PlayerModal
              player={selectedPlayer}
              tournamentPlayers={pack.players.filter(pl => pl.tournament === selectedPlayer.tournament)}
              onClose={() => setSelectedPlayer(null)}
            />
          )}
        </div>
      )}
    </section>
  );
}