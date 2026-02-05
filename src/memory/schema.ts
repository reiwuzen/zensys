import { Tag } from "@/types/tag";

export type MemoryType = "Diary" | "Fact" | "Event" | "Schedule" | "Generic";
export type MemoryItem = {
  memory_id: string;
  created_at: string;
  active_node_id: string;
};



export type MemoryNode = {
  node_id: string
  memory_id: string
  parent_node_id?: string
  created_at: string
  // content_string: string
  content_json: string
  title: string
  memory_type: MemoryType
  change_reason?: string
  tags?: Tag[]
}

export type selectedMemory = {
  memory_item: MemoryItem
  active_node: MemoryNode
  nodes: MemoryNode[]
}