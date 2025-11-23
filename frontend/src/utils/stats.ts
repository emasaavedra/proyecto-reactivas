import type { IPlayer } from "../types/Player";

export function getStatRange(players: IPlayer[], stat: keyof IPlayer) {
    const values = players
        .map(p => Number(p[stat]))
        .filter(v => typeof v === "number" && !isNaN(v));
    if (values.length === 0) return { min: 0, max: 1 }
    return { min: Math.min(...values), max: Math.max(...values) };
};

export function getStatColor(value: number, min: number, max: number) {
    if (max === min) return "#bdbdbd";
    const porcentaje = Math.min(1, Math.max(0, (value - min) / (max - min)));
    const hue = 0 + 270 * porcentaje;
    return `hsl(${hue}, 70%, 80%)`;
}