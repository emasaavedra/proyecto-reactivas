import type { Player } from "./Player";

export type Pack = {
    name: string;
    players: Player[];
    rarity: "default" | "Champions" | "VCT_EMEA" | "VCT_AMERICAS" | "VCT_APAC" | "Masters";
     // Por ahora solo default
};

export type PackHistory = {
    pack: Pack;
    openedAt: Date;
};
