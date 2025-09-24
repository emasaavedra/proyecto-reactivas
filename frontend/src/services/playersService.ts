import axios from "axios";
import type { Player } from "../types/Player";
const baseUrl = "http://localhost:3001/players";

const getAll = async (): Promise<Player[]> => {
  const response = await axios.get<Player[]>(baseUrl);
  return response.data;
};

const getById = async (id: number): Promise<Player> => {
  const response = await axios.get<Player>(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getAll,
  getById,
};
