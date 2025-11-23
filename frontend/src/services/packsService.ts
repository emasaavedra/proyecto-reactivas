import playersService from "./playersService";
import type { Pack } from "../types/Packs";
import { weightedRandomPlayersByACS } from "../utils/randomByACS";

const openDefaultPack = async (): Promise<Pack> => {
  // Obtener todos los jugadores
  const allPlayers = await playersService.getAll();
  
  const selectedPlayers = weightedRandomPlayersByACS(allPlayers, 4);
  
  // Crear el pack
  const pack: Pack = {
    name: "Default Pack",
    players: selectedPlayers,
    rarity: "default"
  };
  
  return pack;
};



export default {
  openDefaultPack,
};