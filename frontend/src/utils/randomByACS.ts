import type { IPlayer } from "../types/Player";

export function weightedRandomPlayersByACS(players: IPlayer[], count = 4) {
  const result = [];

  // Copiar pool original
  let pool = [...players];

  // Obtener min-max ACS para normalizar
  const acsValues = pool.map(p => p.acs || 0);
  const minACS = Math.min(...acsValues);
  const maxACS = Math.max(...acsValues);

  const normalize = (acs: number) => {
    if (maxACS === minACS) return 0.5; // todos iguales → mismo peso
    return (acs - minACS) / (maxACS - minACS); // rango 0..1
  };

  while (result.length < count && pool.length > 0) {
    // Crear pesos basados en ACS normalizado
    const weights = pool.map(p => {
      const acsNorm = normalize(p.acs || 0);
      return 1 / (acsNorm + 0.1); 
      // el +0.1 evita peso infinito si acs=0
    });

    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;

    let chosenIndex = 0;
    for (let i = 0; i < weights.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        chosenIndex = i;
        break;
      }
    }

    result.push(pool[chosenIndex]);
    pool.splice(chosenIndex, 1);
  }

  return result;
}