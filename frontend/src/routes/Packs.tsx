import { useState } from "react";
import packsService from "../services/packsService";
import Player from "../components/player";
import PlayerModal from "../components/playerModal";
import type { Pack } from "../types/Packs";
import type { IPlayer } from "../types/Player";
import { addPlayersToUser } from "../services/userService";
import { useCooldownStore } from "../stores/cooldownStore";
import { useEffect } from "react";
import { getStatRange } from "../utils/stats";
import { Button, Box } from "@mui/material";
import StyleIcon from "@mui/icons-material/Style";

export default function Packs() {
  const [pack, setPack] = useState<Pack | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);
  const cooldownRemaining = useCooldownStore(s => s.cooldownRemaining);
  const updateRemaining = useCooldownStore(s => s.updateRemaining);
  const startCooldown = useCooldownStore(s => s.startCooldown);

  const ratingRange =
  pack && pack.players.length > 0
    ? getStatRange(pack.players, "rating")
    : { min: 0, max: 1 };


  useEffect(() => {
    updateRemaining();
    const interval = setInterval(updateRemaining, 1000);
    return () => clearInterval(interval);
  }, []);

  const openPack = async () => {
    if (cooldownRemaining > 0) return;
    setLoading(true);
    setPack(null);
    try {
      const newPack = await packsService.openDefaultPack();
      setPack(newPack);
      console.log(newPack);
      const response = await addPlayersToUser(newPack.players.map(p => p.id));
      startCooldown();
      
      // Actualizar localStorage con el nuevo contador
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        const userData = JSON.parse(currentUser);
        userData.cards = response.data.cards;
        localStorage.setItem("currentUser", JSON.stringify(userData));
      }

      // Disparar evento para actualizar el usuario en toda la app
      window.dispatchEvent(new Event("userUpdated"));
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
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<StyleIcon />}
          onClick={openPack}
          disabled={loading || cooldownRemaining > 0}
          sx={{
            py: 1.5,
            px: 4,
            fontSize: "1rem",
            backgroundColor: "#3498db",
            "&:hover": {
              backgroundColor: "#2980b9",
              transform: "translateY(-2px)",
            },
            "&:disabled": {
              backgroundColor: "#7f8c8d",
              color: "#bdc3c7",
            },
            transition: "all 0.2s ease"
          }}
        >
          {loading
            ? "Abriendo..."
            : cooldownRemaining > 0
              ? `Cooldown: ${Math.ceil(cooldownRemaining / 1000)}s`
              : "Abrir Pack"}
        </Button>
      </Box>

      {pack && (
        <div className="players-grid">
          {pack.players.slice(0, 4).map((p, idx) => (
            <div
              key={p.id ?? idx}
              onClick={() => setSelectedPlayer(p)}
              style={{ cursor: "pointer" }}
            >
              <Player player={p} ratingRange={ratingRange}/>
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