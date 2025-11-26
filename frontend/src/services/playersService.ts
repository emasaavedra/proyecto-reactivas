import axios from "axios";
import type { IPlayer } from "../types/Player";
const baseUrl = "/api/players";

const getAll = async (): Promise<IPlayer[]> => {
  const response = await axios.get<IPlayer[]>(baseUrl);
  return response.data;
};

const getById = async (id: number): Promise<IPlayer> => {
  const response = await axios.get<IPlayer>(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getAll,
  getById,
};
