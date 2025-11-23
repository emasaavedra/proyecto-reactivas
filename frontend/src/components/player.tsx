import type { IPlayer as PlayerType } from "../types/Player";
import "./player.css";

type Props = {
  player: PlayerType;
};

function safeNum(value: any, decimals = 2) {
  const n = Number(value);
  return isNaN(n) ? "0.00" : n.toFixed(decimals);
}

function Player({ player }: Props) {
  // Asegurar rating seguro antes de compararlo:
  const rating = Number(player.rating) || 0;

  let ratingClass = "";
  if (rating >= 1.1) ratingClass = "gold";
  else if (rating >= 1.0) ratingClass = "silver";
  else ratingClass = "bronze";

  return (
    <div className={`player-card ${ratingClass}`}>
      <div className="player-image">
        <img src={`/${player.photo}`} alt={player.name} />
        <div className="player-rating">{safeNum(player.rating)}</div>
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
