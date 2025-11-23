import { useEffect, useState } from "react";
import { getUserPlayers } from "../services/userService";
import Player from "../components/player";
import PlayerModal from "../components/playerModal";
import type { IPlayer } from "../types/Player";

export default function MyTeam() {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);

  useEffect(() => {
    getUserPlayers().then(setPlayers);
  }, []);

  return (
  <div className="players-grid">
    {players.length === 0 ? (
      <p style={{ width: "100%" }}>no tienes ningun jugador pipipi :(</p>
    ) : (
      players.map((p, idx) => (
        <div
          key={p.id ?? idx}
          onClick={() => setSelectedPlayer(p)}
          style={{ cursor: "pointer" }}
        >
          <Player player={p} />
        </div>
      ))
    )}
    {selectedPlayer && (
      <PlayerModal
        player={selectedPlayer}
        tournamentPlayers={players.filter(pl => pl.tournament === selectedPlayer.tournament)}
        onClose={() => setSelectedPlayer(null)}
      />
    )}
  </div>
);
}