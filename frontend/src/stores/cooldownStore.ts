import { create } from "zustand";
import { persist } from "zustand/middleware";

const COOLDOWN = 5 * 60 * 1000; // 5 min

interface CooldownState {
  lastPackTime: number | null;
  cooldownRemaining: number;
  startCooldown: () => void;
  updateRemaining: () => void;
}

export const useCooldownStore = create<CooldownState>()(
  persist(
    (set, get) => ({
      lastPackTime: null,
      cooldownRemaining: 0,

      startCooldown: () => {
        const now = Date.now();
        set({ lastPackTime: now, cooldownRemaining: COOLDOWN });
      },

      updateRemaining: () => {
        const last = get().lastPackTime;
        if (!last) return;

        const diff = Date.now() - last;
        const remaining = COOLDOWN - diff;

        set({ cooldownRemaining: Math.max(0, remaining) });
      },
    }),
    {
      name: "pack-cooldown",
    }
  )
);
