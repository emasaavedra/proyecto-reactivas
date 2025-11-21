import { create } from "zustand";
import type { IPlayer } from "./Player";
import type { Tournament } from "./Tournament";
import playersService from "../services/playersService";
import tournamentService from "../services/tournamentService";

type PlayerState = {
    players: IPlayer[],
    tournaments: Tournament[],
    error?: string | null,
    
    fetchPlayers: () => void,
    fetchPlayerById: (id: number) => void,
    fetchTournaments: () => void,
    clearError: () => void,
};

export const usePlayerState = create<PlayerState>((set) => ({
    players: [],
    tournaments: [],
    error: null,

    fetchPlayers: async () => {
    try {
      const data = await playersService.getAll();
      set({ players: data });
    } catch (err: any) {
      set({ error: err?.message ?? "Error fetching players" });
    }
  },
    fetchPlayerById: async (id: number) => {
        try{
            const playerResult = await playersService.getById(id).catch(() => null);
            if (!playerResult){
                set({ error: "Error player not found"});
                return;
            }
            set({ players: [playerResult] })
        } catch (err: any) {
            set({ error: err?.message ?? "Error fetching player by id"});
        }        
    },
    fetchTournaments: async () => {
        try{
            const t = await tournamentService.getAllTournaments();
            set({ tournaments: t})
        } catch (err: any) {
            set({ error: err?.message ?? "Error fetching tournaments"});
        }
    },
    clearError: () => set({ error: null}),
}));

export default usePlayerState;