import { useEffect, useState } from "react";
import tournamentService from "./services/tournamentService";
import playersService from "./services/playersService";
import type { Tournament } from "./types/Tournament";
import type { IPlayer } from "./types/Player";
import jugador from "./components/player";
import { getStatRange } from "./utils/stats";
import "./components/tournament-list.css";

function Tournament_list() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [playersById, setPlayersById] = useState<{ [key: number]: IPlayer }>({});
  const [openTournaments, setOpenTournaments] = useState<{ [key: number]: boolean }>({});
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const tournamentsData = await tournamentService.getAllTournaments();
      setTournaments(tournamentsData);

      const allPlayerIds = Array.from(new Set(tournamentsData.flatMap(t => t.players)));
      const playersMap: { [key: number]: IPlayer } = {};
      for (const id of allPlayerIds) {
        try {
          const player = await playersService.getById(id);
          playersMap[id] = player;
        } catch (e) {}
      }
      setPlayersById(playersMap);

      // Inicializar año seleccionado como el más reciente
      const years = tournamentsData.map(t => t.Year);
      setSelectedYear(Math.max(...years));
    };
    fetchData();
  }, []);

  const handleToggle = (id: number) => {
    setOpenTournaments(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrevYear = () => {
    if (selectedYear !== null) setSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    if (selectedYear !== null) setSelectedYear(selectedYear + 1);
  };

  const filteredTournaments = selectedYear
    ? tournaments.filter(t => t.Year === selectedYear)
    : tournaments;

  return (
    <div>
      <h2>Lista de Torneos</h2>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handlePrevYear} disabled={selectedYear === null || selectedYear <= 2021} className="pretty-btn">
          ⬅ Anterior
        </button>
        <span style={{ margin: "0 1rem" }}>
          {selectedYear ?? "Todos los años"}
        </span>
        <button onClick={handleNextYear} disabled={selectedYear === null || selectedYear >= 2025} className="pretty-btn">
          Siguiente ➡
        </button>
      </div>

      {filteredTournaments.length === 0 ? (
        <p>No hay torneos disponibles para este año.</p>
      ) : (
        filteredTournaments.map(tournament => {
          const tournamentPlayers: IPlayer[] = tournament.players
            .map(id => playersById[id])
            .filter(Boolean) as IPlayer[];
          const isOpen = openTournaments[tournament["Tournament ID"]] || false;
          const ratingRange = getStatRange(tournamentPlayers, "rating");

          return (
            <div key={tournament["Tournament ID"]} style={{ marginBottom: "2rem" }}>
              <h3>{tournament.tournament} ({tournament.Year})</h3>
              <button onClick={() => handleToggle(tournament["Tournament ID"])} className="pretty-btn">
                {isOpen ? "Ocultar jugadores" : "Mostrar jugadores"}
              </button>
              {isOpen && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  {tournamentPlayers.length === 0 ? (
                    <p>No hay jugadores para este torneo.</p>
                  ) : (
                    tournamentPlayers
                      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
                      .map(player => (
                        <div key={player.id} style={{ flex: "1 1 150px" }}>
                          {jugador({ player, ratingRange })}
                        </div>
                      ))
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default Tournament_list;
