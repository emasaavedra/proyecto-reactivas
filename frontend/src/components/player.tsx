import type { IPlayer as PlayerType } from "../types/Player";
import "./player.css";
import { getCardRarity, getPlayerRating } from "../utils/stats";

type Props = {
  player: PlayerType;
  ratingRange: { min: number; max: number },
};

function safeNum(value: any, decimals = 2) {
  const n = Number(value);
  return isNaN(n) ? "0.00" : n.toFixed(decimals);
}

function Player({ player, ratingRange }: Props) {
  // Obtener el rating (calculado si es necesario)
  const rating = getPlayerRating(player);

  const rarityInfo = getCardRarity(
    rating,
    ratingRange.min,
    ratingRange.max
  );


  return (
    <div
      className="player-card"
      style={{ background: rarityInfo.gradient }}
    >
      <div className="player-image">
        <img src={`/${player.photo}`} alt={player.name} />
        <div
          className="player-rating"
          style={{ backgroundColor: rarityInfo.color }}
        >
          {safeNum(rating)}
          {player.rating === 0 && (
            <span style={{ fontSize: "0.6rem", display: "block" }}>est.</span>
          )}
        </div>
        <div
          className="player-rarity"
          style={{ 
            backgroundColor: rarityInfo.color,
            color: "white",
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "0.75rem",
            fontWeight: "bold",
            marginTop: "4px"
          }}
        >
          {rarityInfo.rarity}
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
