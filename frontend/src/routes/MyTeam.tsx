import { useEffect, useState } from "react";
import { getUserPlayers } from "../services/userService";
import Player from "../components/player";
import PlayerModal from "../components/playerModal";
import type { IPlayer } from "../types/Player";
import playersService from "../services/playersService";
import { getStatRange, getCardRarity, getPlayerRating, type CardRarity } from "../utils/stats";
import { Button, Chip } from "@mui/material";

export default function MyTeam() {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);
  const [rarityFilter, setRarityFilter] = useState<CardRarity | "Todas">("Todas");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    getUserPlayers().then((players) => {
      console.log("Players recibidos del backend:", players);
      setPlayers(players);
  }).catch(error => {
    console.error("Error obteniendo jugadores:", error);
  });
  }, []);

  const ratingRange = players.length > 0
    ? getStatRange(players, "rating")
    : { min: 0, max: 1 };

  // Filtrar por rareza
  const filteredPlayers = players.filter(p => {
    if (rarityFilter === "Todas") return true;
    const rating = getPlayerRating(p);
    const rarityInfo = getCardRarity(rating, ratingRange.min, ratingRange.max);
    return rarityInfo.rarity === rarityFilter;
  });

  // Ordenar por rating
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    const ratingA = getPlayerRating(a);
    const ratingB = getPlayerRating(b);
    return sortOrder === "desc" ? ratingB - ratingA : ratingA - ratingB;
  });

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
  <div style={{ padding: "1rem" }}>
    <h2 style={{ textAlign: "center" }}>Mi Equipo</h2>

    {players.length === 0 ? (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p style={{ width: "100%" }}>no tienes ningun jugador pipipi :(</p>
        <Button 
          variant="contained"
          onClick={() => 
            getUserPlayers().then((players) => {
              console.log("Players recibidos del backend (botón):", players);
              setPlayers(players);
            }).catch(error => {
              console.error("Error obteniendo jugadores:", error);
            })
          }
        >
          Actualizar inventario
        </Button>
      </div>
    ) : (
      <>
        {/* Botones de Ordenamiento */}
        <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
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

        <div className="players-grid">
          {sortedPlayers.map( (p, idx) => {
            console.log("Renderizando player:", p);
            return (
            <div
              key={p.id ?? idx}
              onClick={() => setSelectedPlayer(p)}
              style={{ cursor: "pointer" }}
            >
              <Player player={ p} ratingRange={ratingRange} />
            </div>
          )})}
        </div>
      </>
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