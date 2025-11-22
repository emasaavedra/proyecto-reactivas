import type { IPlayer } from "../types/Player";
import "./modal.css";

type Props = {
    player: IPlayer;
    tournamentPlayers: IPlayer[],
    onClose: () => void;
};

function getStatRange(players: IPlayer[], stat: keyof IPlayer) {
    const values = players
        .map(p => Number(p[stat]))
        .filter(v => !isNaN(v));
    if (values.length === 0) return { min: 0, max: 1 }
    return { min: Math.min(...values), max: Math.max(...values) };
};

function getStatColor(value: number, min: number, max: number) {
    if (max === min) return "#bdbdbd";
    const porcentaje = Math.min(1, Math.max(0, (value - min) / (max - min)));
    const hue = 0 + 270 * porcentaje;
    return `hsl(${hue}, 70%, 80%)`;
}

export default function PlayerModal({ player, tournamentPlayers, onClose }: Props) {
    return (
    <div className="modal-backdrop">
        <div className="modal-content">
            <button className="modal-close" onClick={onClose}>X</button>
            <div className="modal-body-flex">
                <img
                    src={`/${player.photo}`}
                    alt={player.name}
                    style={{ width: "auto", height: "auto", borderRadius: 12 }}
                />
                <div className="modal-text">
                    <h2>{player.name}</h2>
                    <p>Equipo: {player.team}</p>
                    <p
                    style={{
                        color:
                        player.tournament?.toLowerCase().includes("masters")
                            ? "#a259e6"
                            : player.tournament?.toLowerCase().includes("champions")
                            ? "#ffd700"
                            : undefined,
                        fontWeight: "bold"
                    }}
                    >
                    Torneo: {player.tournament}
                    </p>
                    {["rating", "acs", "kd", "kpr"].map(stat => {
                        const { min, max } = getStatRange(tournamentPlayers, stat as keyof IPlayer);
                        const value = Number(player[stat as keyof IPlayer]) ?? 0;
                        const color = getStatColor(value, min, max);
                        return (
                            <span
                            key={stat}
                            className="stat-box"
                            style={{
                                background: color,
                                color: "#111",
                                fontWeight: "normal"
                            }}
                            >
                            {stat.toUpperCase()}: {value}
                            </span>
                        );
                    })}
                </div>
                </div>
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