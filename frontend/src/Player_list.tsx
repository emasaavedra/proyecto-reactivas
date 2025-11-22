import Player from "./components/player";
import { useEffect, useState } from "react";
import type { IPlayer } from "./types/Player";
import PlayerModal from "./components/playerModal";

import "./Player_list.css";
import usePlayerState from "./types/State";

function Player_list() {
  const players = usePlayerState(state => state.players);
  const fetchPlayers = usePlayerState(state => state.fetchPlayers);
  const error = usePlayerState(state => state.error);

  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);

  useEffect(() => {
    if (players.length === 0) {fetchPlayers()};
  }, [players.length]);

  const tournamentPlayers = selectedPlayer ? players.filter(
    p=> p.tournament === selectedPlayer.tournament
  ) : [];

  return (
    <div className="player-list-container">
      <h2>VCT Players</h2>

      {error ? (
        <p>Error: {error}</p>
      ) : players.length === 0 ? (
        <p>No hay players pipipi</p>
      ) : (
        <div className="players-grid">
          {players.map((p, index) => (
            <div
              key={`${p.id}-${index}`}
              onClick={() => setSelectedPlayer(p)}
              style={{ cursor: "pointer" }}
            >
              <Player player={p} />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          tournamentPlayers={tournamentPlayers}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
}

export default Player_list;
