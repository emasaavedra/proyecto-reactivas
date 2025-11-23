import axios from "axios";
import type { IPlayer } from "../types/Player";

const baseUrl = "http://localhost:3001/api/users";

export const addPlayersToUser = async (playerIds: number[]) => {
  return axios.post(
    `${baseUrl}/me/players`,
    { players: playerIds },
    {
      withCredentials: true,
      headers: { "x-csrf-token": localStorage.getItem("csrfToken") || "" }
    }
  );
};

export const getUserPlayers = async (): Promise<IPlayer[]> => {
  const res = await axios.get(`${baseUrl}/me/players`, {
    withCredentials: true,
    headers: { "x-csrf-token": localStorage.getItem("csrfToken") || "" }
  });
  return res.data.players;
};