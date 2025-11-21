import Player from "./components/player";

import "./Player_list.css";
import usePlayerState from "./types/State";

function Player_list() {
  const { players, error } = usePlayerState(state => ({
      players: state.players,
      tournaments: state.tournaments,
      error: state.error,
  }));

  return (
    <div className="player-list-container">
       <h2>VCT Players</h2>
      {players.length === 0 ? (
        <p>No hay players pipipi</p>
      ) : (
        <div className="players-grid">
          {players.map((p, index) => (
            <Player key={`${p.id}-${index}`} player={p} />
          ))}
        </div>
      )}
      { error ? (
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
