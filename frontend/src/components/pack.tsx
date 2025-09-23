import type { Pack } from "../types/Packs";

const sobres = (pack: Pack) => (
    <div>
        <div>{pack.name}</div>
        <div>Tipo de Pack: {pack.rarity}</div>
        <div>ValoPlayers:</div>
        <ul>
            {pack.players.map((player) => (
                <li key={player.id}>
                    {player.name} -- {player.team} (Rating: {player.rating})
                </li>
            ))}
        </ul>
    </div>
);

export default sobres;