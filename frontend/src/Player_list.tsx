import type { Player } from "./types/Player";
import playersService from "./services/playersService";
import player from "./components/player";
import { useState } from "react";


import { useEffect } from "react";

function Player_list() {
	const [players, setPlayers] = useState<Player[]>([]);

	useEffect(() => {
		const fetchPlayers = async () => {
			const data = await playersService.getAll();
			setPlayers(data);
		};
		fetchPlayers();
	}, []);

	return (
		<div>
			<h2>VCT Players</h2>
			{players.length === 0 ? (
				<p>No hay players pipipi</p>
			) : (
				players.map((p) => (
					<div key={p.id}>
						{player(p)}
					</div>
				))
			)}
		</div>
	);
}

export default Player_list;