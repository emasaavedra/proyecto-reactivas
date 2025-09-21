import type { Player } from "../types/Player";

const jugador = (player: Player) => (
    <div>
        <strong>{player.name}</strong>
        <div>{player.team}</div>
        <div>{player.rating}</div>
        <br />
    </div>
);

export default jugador;