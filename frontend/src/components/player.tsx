import type { IPlayer as PlayerType } from "../types/Player";
import "./player.css"; // importamos la hoja de estilos

type Props = {
  player: PlayerType;
};

function Player({ player }: Props) {
  // asignar clase según rating
  let ratingClass = "";
  if (player.rating >= 1.1) ratingClass = "gold";
  else if (player.rating >= 1.0) ratingClass = "silver";
  else ratingClass = "bronze";

  return (
    <div className={`player-card ${ratingClass}`}>
      <div className="player-image">
        <img src={`/${player.photo}`} alt={player.name} />
        <div className="player-rating">{player.rating.toFixed(2)}</div>
      </div>

      <div className="player-info">
        <h3 className="player-name">{player.name}</h3>
        <p className="player-team">{player.team}</p>
        <p className="player-team">{player.tournament}</p>

        

        <div className="player-stats">
          <span>ACS: {player.acs}</span>
          <span>KD: {player.kd.toFixed(2)}</span>
          <span>KPR: {player.kpr.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default Player;
