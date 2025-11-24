import { useEffect } from "react";
import { getUserPlayers } from "../services/userService";
import playersService from "../services/playersService";
import Player from "../components/player";
import PlayerModal from "../components/playerModal";
import type { IPlayer } from "../types/Player";
import { getStatRange } from "../utils/stats";
import "../components/my-team.css";
import { DraggableSlotWrapper, DraggablePlayer, DroppableSlot } from "../components/DraggableSlotWrapper";
import { useTeamStore } from "../stores/teamStore";
import TeamStats from "../components/TeamStats";

import {
  DndContext,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";


export default function MyTeam() {
  const players = useTeamStore((state) => state.players);
  const setPlayers = useTeamStore((state) => state.setPlayers);

  const slots = useTeamStore((state) => state.slots);
  const setSlots = useTeamStore((state) => state.setSlots);

  const draggingPlayer = useTeamStore((state) => state.draggingPlayer);
  const setDraggingPlayer = useTeamStore((state) => state.setDraggingPlayer);

  const selectedPlayer = useTeamStore((state) => state.selectedPlayer);
  const setSelectedPlayer = useTeamStore((state) => state.setSelectedPlayer);

  const originalIndexMap = useTeamStore((state) => state.originalIndexMap);
  const setOriginalIndexMap = useTeamStore((state) => state.setOriginalIndexMap);


  useEffect(() => {
    getUserPlayers().then(async (ids) => {
    const fetched = await Promise.all(ids.map(id => playersService.getById(id)));

    const map: Record<string, number> = {};
    fetched.forEach((p, i) => (map[p.id] = i));
    setOriginalIndexMap(map);

    const slotIds = slots.filter(Boolean).map(p => p!.id);
    const inventoryPlayers = fetched.filter(p => !slotIds.includes(p.id));

    setPlayers(inventoryPlayers);
    });
  }, []);


  const ratingRange =
    players.length > 0 ? getStatRange(players, "rating") : { min: 0, max: 1 };

  const resetSlots = () => {
    // Obtiene todos los jugadores que estaban en slots
    const playersInSlots = slots.filter((s) => s !== null) as IPlayer[];

    // Inserta cada uno en su índice original
    const newPlayers = [...players];
    
    playersInSlots.forEach((player) => {
      const originalIndex = originalIndexMap[player.id];
      newPlayers.splice(originalIndex, 0, player);
    });

    setPlayers(newPlayers);
    setSlots([null, null, null, null, null]);
  };


  // ---------- DROPPABLE INVENTORY ----------
  const { setNodeRef: invRef, isOver: invIsOver } = useDroppable({
    id: "inventory",
  });

  // ---------- ON DRAG START ----------
  const handleDragStart = ({ active }: any) => {
    setDraggingPlayer(active.data.current.player || null);
  };

  // ---------- ON DRAG END ----------
  const handleDragEnd = ({ active, over }: any) => {
    if (!over) {
      setDraggingPlayer(null);
      return;
    }

    const player = active.data.current.player;
    const from = active.data.current.from;

    // ---------------------------
    // DROP EN UN SLOT
    // ---------------------------
    if (over.id.startsWith("slot-")) {
      const slotIndex = Number(over.id.split("-")[1]);

      // Si el slot ya tiene jugador, no hacer nada
      if (slots[slotIndex]) {
        setDraggingPlayer(null);
        return;
      }

      // Si viene del inventory → poner en slot
      if (from === "inventory") {
        const newSlots = [...slots];
        newSlots[slotIndex] = player;

        const newPlayers = players.filter((p) => p.id !== player.id);

        setPlayers(newPlayers);
        setSlots(newSlots);
      }

      // Si viene del slot → mover a slot vacío NO permitido (slots libres pero no entre slots)
      if (from === "slot") {
        setDraggingPlayer(null);
        return;
      }
    }

    // ---------------------------
    // DROP EN INVENTARIO
    // ---------------------------
    if (over.id === "inventory") {
      // Si viene de inventario → no hacer nada
      if (from === "inventory") {
        setDraggingPlayer(null);
        return;
      }

      // Viene de un slot → devolverlo a su posición original
      if (from === "slot") {
        // removerlo del slot
        const newSlots = slots.map((s) => (s?.id === player.id ? null : s));

        // volverlo a insertar en su índice original
        const originalIndex = originalIndexMap[player.id];
        const newPlayers = [...players];
        newPlayers.splice(originalIndex, 0, player);

        setSlots(newSlots);
        setPlayers(newPlayers);
      }
    }

    setDraggingPlayer(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "60px" }}>
        
        {/* INVENTARIO */}
        <div
          ref={invRef}
          style={{
            width: "250px",
            height: "800px",
            overflow: "auto",
            background: invIsOver ? "#223388" : "transparent",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <h2 style={{ color: "white" }}>Inventario</h2>

          {players.map((p) => (
            <DraggablePlayer key={p.id} player={p} from="inventory" ratingRange={ratingRange} setSelectedPlayer={setSelectedPlayer} />
          ))}
        </div>

        {/* SLOTS */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <h2 style={{ color: "white" }}>Mi equipo</h2>

            <button
              onClick={resetSlots}
              style={{
                padding: "6px 12px",
                background: "#e74c3c",
                border: "none",
                color: "white",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Reiniciar
            </button>
          </div>


          <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            {slots.map((player, i) => (
              <DraggableSlotWrapper
                key={i}
                index={i}
                player={player}
                ratingRange={ratingRange}
                setSelectedPlayer={setSelectedPlayer}
              >
                <DroppableSlot index={i} player={slots[i]} ratingRange={ratingRange}/>
              </DraggableSlotWrapper>
            ))}
          </div>
          {/* Promedio de stats del equipo */}
            <TeamStats slots={slots} allPlayers={players} />
        </div>

      </div>

      {/* DRAG OVERLAY → El player que estás arrastrando */}
      <DragOverlay>
        {draggingPlayer && (
          <Player player={draggingPlayer} ratingRange={ratingRange} />
        )}
      </DragOverlay>

      {selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          tournamentPlayers={players.filter(
            (pl) => pl.tournament === selectedPlayer.tournament
          )}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </DndContext>
  );
}
