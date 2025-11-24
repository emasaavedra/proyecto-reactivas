import type { IPlayer as PlayerType } from "../types/Player";
import "./player.css";
import { getStatColor } from "../utils/stats";

import DuelistIcon from "/icons/duelistSymbol.webp?url";
import InitiatorIcon from "/icons/initiatorSymbol.webp?url";
import ControllerIcon from "/icons/controllerSymbol.webp?url";
import SentinelIcon from "/icons/sentinelSymbol.webp?url";
import FlexIcon from "/icons/wildcardSymbol.png?url";


type Props = {
  player: PlayerType | null;
  ratingRange: { min: number; max: number }
};

const roleColors: Record<string, string> = {
  Duelist: "#ff4d4d",
  Initiator: "#3399ff",
  Controller: "#33ff33",
  Sentinel: "#ffcc33",
  Flex: "#6A0DAD"
};

const roleIcons: Record<string, string> = {
  Duelist: DuelistIcon,
  Initiator: InitiatorIcon,
  Controller: ControllerIcon,
  Sentinel: SentinelIcon,
  Flex: FlexIcon
};

function safeNum(value: any, decimals = 2) {
  const n = Number(value);
  return isNaN(n) ? "0.00" : n.toFixed(decimals);
}

function Player({ player, ratingRange }: Props) {
  if (!player) {
    const borderColor = roleColors["Flex"];
    const icon = roleIcons["Flex"];

    return (
      <div
        className="player-slot"
        style={{
          width: "180px",
          height: "220px",
          borderRadius: "12px",
          border: `3px solid ${borderColor}`,
          background: "#1E3A8A",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxSizing: "border-box",
        }}
      >
        <img
          src={icon}
          alt={"Player"}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            width: "28px",
            height: "28px",
          }}
        />
        <span
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: borderColor,
            userSelect: "none",
          }}
        >
          +
        </span>
      </div>
    );
  }

  const rating = Number(player.rating) || 1.0;

  const dynamicColor = getStatColor(
    rating,
    ratingRange.min,
    ratingRange.max
  );


  return (
    <div
      className="player-card"
      style={{ backgroundColor: dynamicColor }}
    >
      <div className="player-image">
        <img src={`/${player.photo}`} alt={player.name} />
        <div
          className="player-rating"
          style={{ backgroundColor: dynamicColor }}
        >
          {safeNum(player.rating)}
        </div>
      </div>

      <div className="player-info">
        <h3 className="player-name">{player.name}</h3>
        <p className="player-team">{player.team}</p>
        <p className="player-team">{player.tournament}</p>

        <div className="player-stats">
          <span>ACS: {safeNum(player.acs, 0)}</span>
          <span>KD: {safeNum(player.kd)}</span>
          <span>KPR: {safeNum(player.kpr)}</span>
        </div>
      </div>
    </div>
  );
}

export default Player;
