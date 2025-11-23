import { useEffect, useState } from "react";
import { getUserPlayers } from "../services/userService";
import Player from "../components/player";
import PlayerModal from "../components/playerModal";
import type { IPlayer } from "../types/Player";
import playersService from "../services/playersService";
import { getStatRange } from "../utils/stats";

export default function MyTeam() {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);

  useEffect(() => {
    getUserPlayers().then(async (ids) => {

      const fetchedPlayers = await Promise.all(
        ids.map((id) => playersService.getById(id))
      );

      console.log("Holaaaaa, Players:", fetchedPlayers);
      setPlayers(fetchedPlayers);
  });
  }, []);

  const ratingRange = players.length > 0
    ? getStatRange(players, "rating")
    : { min: 0, max: 1 };

  const sortedPlayers = [...players].sort((a, b) => b.rating - a.rating);

  return (
  <div className="players-grid">

    {players.length === 0 ? (
      <div>
      <p style={{ width: "100%" }}>no tienes ningun jugador pipipi :(</p>
      <button onClick={() => 
                getUserPlayers().then(async (ids) => {
                const fetchedPlayers = await Promise.all(
                  ids.map((id) => playersService.getById(id))
                );
                setPlayers(fetchedPlayers);
              })
            }
          >
        Actualizar inventario
      </button>
      </div>
    ) : (
      
      sortedPlayers.map( (p, idx) => {
        console.log("Renderizando player:", p);
        return (
        <div
          key={p.id ?? idx}
          onClick={() => setSelectedPlayer(p)}
          style={{ cursor: "pointer" }}
        >
          <Player player={ p} ratingRange={ratingRange} />
        </div>
      )})
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