import type { Pack } from "../types/Packs";

const sobres = (pack: Pack) => (
    <div style={{ padding: '20px' }}>
        <h2>{pack.name} - {pack.rarity}</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {pack.players.map((player) => (
                <div key={player.id} style={{
                    border: '1px solid #ff4655',
                    borderRadius: '8px',
                    padding: '10px',
                    background: '#1a1a1a',
                    color: 'white',
                    minWidth: '200px'
                }}>
                    <strong style={{ color: '#ff4655' }}>{player.name}</strong><br/>
                    <span style={{ color: '#00d4ff' }}>{player.team}</span><br/>
                    <span style={{ color: '#00ff88' }}>Rating: {player.rating}</span>
                </div>
            ))}
        </div>
    </div>
);

export default sobres;