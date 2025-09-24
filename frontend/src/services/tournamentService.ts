import axios from "axios";
import type { Tournament } from "../types/Tournament";
const baseUrl = "http://localhost:3001/tournaments";

const getAllTournaments = async (): Promise<Tournament[]> => {
  const response = await axios.get<Tournament[]>(baseUrl);
  return response.data;
};

const getTournamentById = async (id: number): Promise<Tournament> => {
  const response = await axios.get<Tournament>(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getAllTournaments,
  getTournamentById,
};
