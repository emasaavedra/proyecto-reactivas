import { useEffect, useState } from "react";
import tournamentService from "./services/tournamentService";
import playersService from "./services/playersService";
import type { Tournament } from "./types/Tournament";
import type { Player } from "./types/Player";
import jugador from "./components/player";

function Tournament_list() {
	const [tournaments, setTournaments] = useState<Tournament[]>([]);
	const [playersById, setPlayersById] = useState<{[key: number]: Player}>({});
	const [openTournaments, setOpenTournaments] = useState<{[key: number]: boolean}>({});

	useEffect(() => {
		const fetchData = async () => {
			const tournamentsData = await tournamentService.getAllTournaments();
			setTournaments(tournamentsData);

			// Obtener todos los jugadores por ID
			const allPlayerIds = Array.from(new Set(tournamentsData.flatMap(t => t.players)));
			const playersMap: {[key: number]: Player} = {};
			for (const id of allPlayerIds) {
				try {
					const player = await playersService.getById(id);
					playersMap[id] = player;
				} catch (e) {
					// Si no existe el jugador, ignorar
				}
			}
			setPlayersById(playersMap);
		};
		fetchData();
	}, []);

	const handleToggle = (id: number) => {
		setOpenTournaments(prev => ({ ...prev, [id]: !prev[id] }));
	};

	return (
		<div>
			<h2>Lista de Torneos</h2>
			{tournaments.length === 0 ? (
				<p>No hay torneos disponibles.</p>
			) : (
				tournaments.map((tournament) => {
					const tournamentPlayers: number[] = tournament.players;
					const isOpen = openTournaments[tournament["Tournament ID"]] || false;
					return (
						<div key={tournament["Tournament ID"]} style={{marginBottom: "2rem"}}>
							<h3>{tournament.tournament} ({tournament.Year})</h3>
							<button onClick={() => handleToggle(tournament["Tournament ID"])}>
								{isOpen ? "Ocultar jugadores" : "Mostrar jugadores"}
							</button>
							{isOpen && (
								<div>
									{tournamentPlayers.length === 0 ? (
										<p>No hay jugadores para este torneo.</p>
									) : (
										tournamentPlayers
											.map(id => playersById[id])
											.filter(Boolean)
											.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
											.map(player => (
												<div key={player.id}>{jugador(player)}</div>
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
