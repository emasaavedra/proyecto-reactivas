import type { IPlayer } from "../types/Player";
import "./player.css";

type Props = {
    player: IPlayer;
    tournamentPlayers: IPlayer[],
    onClose: () => void;
};

function getStatRange(players: IPlayer[], stat: keyof IPlayer) {
    const values = players.map(p => Number(p[stat]) ?? 0);
    return { min: Math.min(...values), max: Math.max(...values) };
};

function getStatColor(value: number, min: number, max: number) {
    if (max === min) return "#aaa";
    const porcentaje = Math.min(1, Math.max(0, (value - min) / (max - min)));
    const hue = (270 + porcentaje * 360) % 360;
    return `hsl(${hue}, 70%, 85%)`;
}

export default function PlayerModal({ player, onClose }: Props) {
    return (
    <div className="modal-backdrop">
        <div className="modal-content">
            <button className="modal-close" onClick={onClose}>X</button>
            <img src={`/${player.photo}`} alt={player.name} style={{ width: 120 }} />
            <h2>{player.name}</h2>
            <p>Equipo: {player.team}</p>
            <p>Torneo: {player.tournament}</p>
            {/* Estadísticas coloreadas por gradiente */}
            {["rating", "acs", "kd", "kpr"].map(stat => {
                const { min, max } = getStatRange(
                    // @ts-ignore
                    // tournamentPlayers puede venir por props o puedes usar [] si no está
                    (typeof tournamentPlayers !== "undefined" ? tournamentPlayers : []),
                    stat as keyof IPlayer
                );
                const value = Number(player[stat as keyof IPlayer]) ?? 0;
                const color = getStatColor(value, min, max);
                return (
                    <p key={stat} style={{ color, fontWeight: "bold" }}>
                        {stat.toUpperCase()}: {value}
                    </p>
                );
            })}
        </div>
    </div>
)
}
/**
 * #c7abe3
 * #b9abe3
 * #abb9e3
 * #abe3af
 * #e3d3ab
 * #e3acab
 * 
 */