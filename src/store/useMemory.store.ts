import { create } from "zustand";
import { Memory } from "@/types/memory";

type MemoryStore = {
  memories: Memory[];
  setMemories: (ms: Memory[]) => void;
  memory: Memory | null;
  oldMemory: Memory | null;
  setOldMemory: (oM: Memory) => void;
  setMemory: (m: Partial<Memory>) => void;
  resetMemory: () => void;
};

export const useMemoryStore = create<MemoryStore>((set) => ({
  memories: [],
  setMemories: (ms) =>
    set({
      memories: ms,
    }),
  memory: null,
  oldMemory: null,
  setOldMemory: (oM) =>
    set({
      oldMemory: oM,
    }),
  setMemory: (m) =>
    set((s) => ({
      memory: { ...s.memory, ...m } as Memory,
    })),
  /**
   * resets memory from memory store
   * @returns void
   */
  resetMemory: () =>
    set({
      memory: null,
    }),

  /**
   * reloads Memory of given memory Id
   * @param memoryId
   * @returns `memory`
   */
  
}));
