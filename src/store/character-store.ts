import { create } from "zustand";
import { createJSONStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";

export const blade = "blade";
export const brute = "brute";
export const bee = "bee";

interface CharacterStore {
  character: string | null;
  setCharacter: (character: string) => void;
}

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set) => ({
      character: null,
      setCharacter: (character) => set({ character: character }),
    }),
    {
      name: "character-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
