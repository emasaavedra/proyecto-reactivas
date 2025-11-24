import React from "react";
import type { IPlayer } from "../types/Player";
import { getStatRange, getStatColor } from "../utils/stats";

interface TeamStatsProps {
slots: (IPlayer | null)[];
allPlayers: IPlayer[]; // Para calcular rango global
}

const TeamStats: React.FC<TeamStatsProps> = ({ slots, allPlayers }) => {
const activePlayers = slots.filter((s): s is IPlayer => s !== null);

if (activePlayers.length === 0) {
return <div style={{ color: "white" }}>No hay jugadores en los slots</div>;
}

const statKeys = ["rating", "acs", "kd", "kpr"] as const;

const averages: Record<string, number> = {};
statKeys.forEach((key) => {
const values = activePlayers.map((p) => (p[key] ?? 0));
averages[key] = values.reduce((a, b) => a + b, 0) / values.length;
});

return (
<div style={{ marginTop: "20px", color: "white" }}> <h3>Promedio del equipo:</h3>
<ul style={{ listStyle: "none", padding: 0 }}>
{statKeys.map((key) => {
const { min, max } = getStatRange(allPlayers, key);
const value = averages[key];
const color = getStatColor(averages[key], min, max);
return ( <span
key={key}
className="stat-box"
style={{
background: color,
color: "#111",
fontWeight: "normal",
padding: "4px 8px",
borderRadius: "6px",
minWidth: "60px",
textAlign: "center"
}}
>
{key.toUpperCase()}: {value.toFixed(1)}</span>
);
})} </ul> </div>
);
};

export default TeamStats;
