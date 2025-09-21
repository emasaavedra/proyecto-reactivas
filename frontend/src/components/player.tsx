import type { Player } from "../types/Player";

const jugador = (player: Player) => (
    <div>
        <div><strong>{player.team}</strong> {player.name}</div>
        <div>Rating: {player.rating}</div>
        <br />
    </div>
);

export default jugador;