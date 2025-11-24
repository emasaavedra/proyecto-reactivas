import Player from "./components/player";
import { useEffect, useState } from "react";
import type { IPlayer } from "./types/Player";
import PlayerModal from "./components/playerModal";

import "./Player_list.css";
import usePlayerState from "./stores/State";
import { getStatRange, getCardRarity, getPlayerRating, type CardRarity } from "./utils/stats";
import { Button, Chip } from "@mui/material";


function Player_list() {
  const players = usePlayerState(state => state.players);
  const fetchPlayers = usePlayerState(state => state.fetchPlayers);
  const error = usePlayerState(state => state.error);

  const ratingRange = players.length > 0 
  ? getStatRange(players, "rating")
  : { min: 0, max: 1 };

  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);
  const [rarityFilter, setRarityFilter] = useState<CardRarity | "Todas">("Todas");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");

  useEffect(() => {
    if (players.length === 0) {fetchPlayers()};
  }, [players.length]);

  const tournamentPlayers = selectedPlayer ? players.filter(
    p=> p.tournament === selectedPlayer.tournament
  ) : [];

  let filteredPlayers = players.filter(p => {
    if (rarityFilter === "Todas") return true;
    const rating = getPlayerRating(p);
    const rarityInfo = getCardRarity(rating, ratingRange.min, ratingRange.max);
    return rarityInfo.rarity === rarityFilter;
  });

  if (sortOrder !== "none") {
    filteredPlayers = [...filteredPlayers].sort((a, b) => {
      const ratingA = getPlayerRating(a);
      const ratingB = getPlayerRating(b);
      return sortOrder === "desc" ? ratingB - ratingA : ratingA - ratingB;
    });
  }

  const rarityColors: Record<CardRarity, string> = {
    "Legendaria": "#ff6b6b",
    "Épica": "#9b59b6",
    "Especial": "#f39c12",
    "Normal": "#3498db",
    "Común": "#95a5a6"
  };

  const rarityIcons: Record<CardRarity, string> = {
    "Legendaria": "🌈",
    "Épica": "💜",
    "Especial": "🧡",
    "Normal": "💙",
    "Común": "⚪"
  };

  return (
    <div className="player-list-container">
      <h2>VCT Players</h2>

      {/* Botones de Ordenamiento */}
      <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Button 
          variant={sortOrder === "none" ? "contained" : "outlined"}
          onClick={() => setSortOrder("none")}
          sx={{ textTransform: "none" }}
        >
          Sin orden
        </Button>
        <Button 
          variant={sortOrder === "desc" ? "contained" : "outlined"}
          onClick={() => setSortOrder("desc")}
          sx={{ textTransform: "none" }}
        >
          ⬇️ Rating: Mayor a Menor
        </Button>
        <Button 
          variant={sortOrder === "asc" ? "contained" : "outlined"}
          onClick={() => setSortOrder("asc")}
          sx={{ textTransform: "none" }}
        >
          ⬆️ Rating: Menor a Mayor
        </Button>
      </div>

      {/* Filtros por Rareza */}
      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Button 
          variant={rarityFilter === "Todas" ? "contained" : "outlined"}
          onClick={() => setRarityFilter("Todas")}
          sx={{
            backgroundColor: rarityFilter === "Todas" ? "#3498db" : "transparent",
            color: rarityFilter === "Todas" ? "white" : "#3498db",
            borderColor: "#3498db",
            "&:hover": {
              backgroundColor: rarityFilter === "Todas" ? "#2980b9" : "#e3f2fd"
            }
          }}
        >
          Todas <Chip label={players.length} size="small" sx={{ ml: 1 }} />
        </Button>
        
        {(["Legendaria", "Épica", "Especial", "Normal", "Común"] as CardRarity[]).map(rarity => {
          const count = players.filter(p => {
            const rating = getPlayerRating(p);
            const rarityInfo = getCardRarity(rating, ratingRange.min, ratingRange.max);
            return rarityInfo.rarity === rarity;
          }).length;

          return (
            <Button 
              key={rarity}
              variant={rarityFilter === rarity ? "contained" : "outlined"}
              onClick={() => setRarityFilter(rarity)}
              sx={{
                backgroundColor: rarityFilter === rarity ? rarityColors[rarity] : "transparent",
                color: rarityFilter === rarity ? "white" : rarityColors[rarity],
                borderColor: rarityColors[rarity],
                "&:hover": {
                  backgroundColor: rarityFilter === rarity ? rarityColors[rarity] : `${rarityColors[rarity]}20`
                }
              }}
            >
              {rarityIcons[rarity]} {rarity} <Chip label={count} size="small" sx={{ ml: 1 }} />
            </Button>
          );
        })}
      </div>

      {error ? (
        <p>Error: {error}</p>
      ) : filteredPlayers.length === 0 ? (
        <p>No hay jugadores con esta rareza</p>
      ) : (
        <div className="players-grid">
          {filteredPlayers.map((p, index) => (
            <div
              key={`${p.id}-${index}`}
              onClick={() => setSelectedPlayer(p)}
              style={{ cursor: "pointer" }}
            >
              <Player player={p} ratingRange={ratingRange}/>
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
      <button
        className="scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Volver arriba"
      >
        ↑
      </button>
    </div>
  );
}

export default Player_list;
