import type { IPlayer } from "../types/Player";
import Player from "./player";

type Props = {
  index: number;
  player: IPlayer | null;                 // El jugador que se muestra
  ratingRange: { min: number; max: number };
  setSelectedPlayer: (p: IPlayer) => void;
  children?: React.ReactNode;      // Si quieres añadir contenido adicional
};

import {
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

export function DraggableSlotWrapper({ player, ratingRange, setSelectedPlayer, children }: Props) {
  if (!player) return children;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: player.id.toString(),
    data: { player, from: "slot" },
  });

  return (
    <div style={{ position: "relative" }}>
      {/* SLOT es droppable, pero NO draggable */}
      {children}

      {/* ESTE es el player draggable */}
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        onClick={() => player && setSelectedPlayer(player)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
          cursor: "grab",
        }}
      >
        <Player player={player} ratingRange={ratingRange} />
      </div>
    </div>
  );
};

export function DraggablePlayer({
                                player,
                                from,
                                setSelectedPlayer,
                                ratingRange
                              }: {
                                player: IPlayer;
                                from: string;
                                setSelectedPlayer: (p: IPlayer) => void;
                                ratingRange: { min: number; max: number };
                              })  {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: player.id.toString(),
      data: { player, from },
    });

    const style = {
      transform: transform
        ? `translate(${transform.x}px, ${transform.y}px)`
        : undefined,
    };

    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        onClick={() => setSelectedPlayer(player)}
      >
        <Player player={player} ratingRange={ratingRange} />
      </div>
    );
  }

type DroppableSlotProps = {
  index: number;
  player: IPlayer | null;
  ratingRange: { min: number; max: number } | null;
};


export function DroppableSlot({ index, player, ratingRange }: DroppableSlotProps) {
    const { setNodeRef, isOver } = useDroppable({
      id: `slot-${index}`,
      data: { slotIndex: index },
    });

    return (
      <div
        ref={setNodeRef}
        style={{
          border: isOver ? "3px solid white" : "3px solid transparent",
          padding: "4px",
        }}
      >
        <Player player={player} ratingRange={(ratingRange) ? ratingRange : {min: 10, max: 280}} />
      </div>
    );
  }
