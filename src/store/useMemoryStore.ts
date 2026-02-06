import { MemoryItem, MemoryNode } from "@/memory/schema";
import { invoke } from "@tauri-apps/api/core";
import { create } from "zustand";

export type Memory = {
  memoryItem: MemoryItem;
  activeNode: MemoryNode;
  nodes?: MemoryNode[];
};

type MemoryStore = {
  memory: Memory | null;
  setMemory: (m: Memory | null) => void;
  reloadMemory: (memoryId: string) => Promise<Memory>;
};

export const useMemoryStore = create<MemoryStore>((set) => ({
  memory: null,
  setMemory: (m) =>
    set({
      memory: m,
    }),
  reloadMemory: async (memoryId) => {
    const { memory_item: memoryItem, active_node:activeNode, nodes } =
  await invoke<{
    memory_item: MemoryItem;
    active_node: MemoryNode;
    nodes: MemoryNode[];
  }>("get_memory_item_active_node_nodes", { memoryId });

set({
  memory: {
    memoryItem: memoryItem,
    activeNode: activeNode,
    nodes,
  },
});
    return { memoryItem, activeNode, nodes };
  },
}));
