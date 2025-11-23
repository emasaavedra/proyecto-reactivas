import type { IPlayer as PlayerType } from "../types/Player";
import "./player.css";
import { getStatColor } from "../utils/stats";

type Props = {
  player: PlayerType;
  ratingRange: { min: number; max: number },
};

function safeNum(value: any, decimals = 2) {
  const n = Number(value);
  return isNaN(n) ? "0.00" : n.toFixed(decimals);
}

function Player({ player, ratingRange }: Props) {
  // Asegurar rating seguro antes de compararlo:
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
