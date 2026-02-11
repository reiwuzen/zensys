import { MemoryItem, MemoryNode } from "@/memory/schema";

export type Memory = {
  memory_item: MemoryItem;
  head_node: MemoryNode;
  nodes: MemoryNode[];
};