import type { IPlayer } from "../types/Player";

export type CardRarity = "Común" | "Normal" | "Especial" | "Épica" | "Legendaria";

export interface RarityInfo {
    rarity: CardRarity;
    color: string;
    gradient: string;
}

/**
 * Calcula el rating estimado basándose en las estadísticas del jugador
 * Fórmula aproximada basada en el sistema de rating de VCT
 */
export function calculateEstimatedRating(player: IPlayer): number {
    const acs = Number(player.acs) || 0;
    const kd = Number(player.kd) || 0;
    const kpr = Number(player.kpr) || 0;
    const kast = Number(player.kast) || 0;
    
    // Fórmula aproximada para estimar el rating
    // Basada en análisis de datos: Rating ≈ (ACS/235) * 0.4 + KD * 0.3 + KPR * 0.2 + (KAST/100) * 0.1
    const estimatedRating = (acs / 235) * 0.4 + kd * 0.3 + kpr * 0.2 + (kast / 100) * 0.1;
    
    return Math.max(0, Number(estimatedRating.toFixed(2)));
}

/**
 * Obtiene el rating del jugador, calculándolo si es 0
 */
export function getPlayerRating(player: IPlayer): number {
    const rating = Number(player.rating) || 0;
    
    // Si el rating es 0, intentar calcularlo
    if (rating === 0) {
        return calculateEstimatedRating(player);
    }
    
    return rating;
}

export function getStatRange(players: IPlayer[], stat: keyof IPlayer) {
    const values = players
        .map(p => {
            // Si estamos calculando el rango de rating, usar el rating calculado
            if (stat === 'rating') {
                return getPlayerRating(p);
            }
            return Number(p[stat]);
        })
        .filter(v => typeof v === "number" && !isNaN(v));
    if (values.length === 0) return { min: 0, max: 1 }
    return { min: Math.min(...values), max: Math.max(...values) };
};

export function getCardRarity(rating: number, minRating: number, maxRating: number): RarityInfo {
    // Si todos los ratings son iguales, asignar basado en el valor absoluto
    if (maxRating === minRating) {
        // Si el rating es muy bajo (menor a 1.0), es común
        if (rating < 1.0) {
            return {
                rarity: "Común",
                color: "#95a5a6",
                gradient: "linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)"
            };
        }
        return {
            rarity: "Normal",
            color: "#3498db",
            gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)"
        };
    }

    // Calcular el percentil del rating (asegurándose de que esté entre 0 y 1)
    const normalizedRating = Math.max(0, Math.min(1, (rating - minRating) / (maxRating - minRating)));

    // Dividir en 5 rangos equivalentes (cada uno 20%)
    if (normalizedRating >= 0.8) {
        // Top 20% - Legendaria (Multicolor)
        return {
            rarity: "Legendaria",
            color: "#ff6b6b",
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #feca57 100%)"
        };
    } else if (normalizedRating >= 0.6) {
        // 60-80% - Épica (Morado)
        return {
            rarity: "Épica",
            color: "#9b59b6",
            gradient: "linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)"
        };
    } else if (normalizedRating >= 0.4) {
        // 40-60% - Especial (Dorado/Naranjo)
        return {
            rarity: "Especial",
            color: "#f39c12",
            gradient: "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)"
        };
    } else if (normalizedRating >= 0.2) {
        // 20-40% - Normal (Azul)
        return {
            rarity: "Normal",
            color: "#3498db",
            gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)"
        };
    } else {
        // Bottom 20% - Común (Gris)
        return {
            rarity: "Común",
            color: "#95a5a6",
            gradient: "linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)"
        };
    }
}

export function getStatColor(value: number, min: number, max: number) {
    if (max === min) return "#bdbdbd";
    const porcentaje = Math.min(1, Math.max(0, (value - min) / (max - min)));
    const hue = 0 + 270 * porcentaje;
    return `hsl(${hue}, 70%, 80%)`;
}