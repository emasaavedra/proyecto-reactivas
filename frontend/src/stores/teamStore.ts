import { create } from "zustand";
import type { IPlayer } from "../types/Player";

type TeamState = {
  players: IPlayer[];
  slots: (IPlayer | null)[];
  draggingPlayer: IPlayer | null;
  selectedPlayer: IPlayer | null;
  originalIndexMap: Record<string, number>;
  setPlayers: (players: IPlayer[]) => void;
  setSlots: (slots: (IPlayer | null)[]) => void;
  setDraggingPlayer: (player: IPlayer | null) => void;
  setSelectedPlayer: (player: IPlayer | null) => void;
  setOriginalIndexMap: (map: Record<string, number>) => void;
};

export const useTeamStore = create<TeamState>((set) => ({
  players: [],
  slots: [null, null, null, null, null],
  draggingPlayer: null,
  selectedPlayer: null,
  originalIndexMap: {},
  setPlayers: (players) => set({ players }),
  setSlots: (slots) => set({ slots }),
  setDraggingPlayer: (draggingPlayer) => set({ draggingPlayer }),
  setSelectedPlayer: (selectedPlayer) => set({ selectedPlayer }),
  setOriginalIndexMap: (originalIndexMap) => set({ originalIndexMap }),
}));
