import playersService from "./playersService";
import type { Pack } from "../types/Packs";

const openDefaultPack = async (): Promise<Pack> => {
  // Obtener todos los jugadores
  const allPlayers = await playersService.getAll();
  
  // Seleccionar 5 aleatorios
  const shuffled = allPlayers.sort(() => 0.5 - Math.random());
  const selectedPlayers = shuffled.slice(0, 5);
  
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