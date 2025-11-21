import Player from "./components/player";
import { useEffect } from "react";

import "./Player_list.css";
import usePlayerState from "./types/State";

function Player_list() {
  const { players, fetchPlayers, error } = usePlayerState(state => ({
    players: state.players,
    fetchPlayers: state.fetchPlayers,
    error: state.error,
  }));

  useEffect(() => {
    if (players.length === 0) fetchPlayers();
  }, [fetchPlayers, players.length]);

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
            <Player key={`${p.id}-${index}`} player={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Player_list;
