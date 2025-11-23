import axios from "axios";

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

export const getUserPlayers = async (): Promise<any[]> => {
  const res = await axios.get(`${baseUrl}/me/players`, {
    withCredentials: true,
    headers: { "x-csrf-token": localStorage.getItem("csrfToken") || "" }
  });
  return res.data.players;
};

export const deleteUserPlayers = async (): Promise<number[]> => {
  const res = await axios.delete(`${baseUrl}/me/players`, {
    withCredentials: true,
    headers: { "x-csrf-token": localStorage.getItem("csrfToken") || "" }
  });

  return res.data.myPlayers;
};
