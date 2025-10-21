import type { IPlayer } from "./types/Player";
import playersService from "./services/playersService";
import Player from "./components/player";
import { useState, useEffect } from "react";

import "./Player_list.css";

function Player_list() {
  const [players, setPlayers] = useState<IPlayer[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await playersService.getAll();
      setPlayers(data);
    };
    fetchPlayers();
  }, []);

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
    </div>
  );
}

export default Player_list;
