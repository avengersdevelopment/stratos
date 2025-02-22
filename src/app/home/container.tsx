"use client";

import { useCharacterStore } from "@/store/character-store";

export default function Container() {
  const { character } = useCharacterStore();

  return (
    <div>
      <h1>{character}</h1>
    </div>
  );
}
