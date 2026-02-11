import { v7 } from "uuid";
import { MemoryItem, MemoryNode, MemoryType } from "@/memory/schema";
import { invoke } from "@tauri-apps/api/core";
import { createBlock } from "@/helper/createBlock";
import { Result } from "@/types/result";
// import { Memory } from "@/types/memory";
export const MemoryItemService = () => {
  const createMemoryItem = async (title: string, type: MemoryType) => {
    const memory_id = v7();
    const node_id = v7();
    const memoryItem: MemoryItem = {
      memory_id,
      title,
      created_at: new Date().toISOString(),
      head_node_id: node_id,
      last_updated_at: '',
      last_opened_at: '', 
      memory_type: type,
      tags: [],
    };
    const memoryNode: MemoryNode ={
      node_id,
      created_at: new Date().toISOString(),
      memory_id,
      content_json: JSON.stringify([createBlock('paragraph')])
    }
   
    await invoke("create_memory_item_with_initial_node", {
      memoryItem: memoryItem,
      memoryNode:memoryNode

    });

    return { memoryItem,  };
  };
  const addNewNodeToExistingMemoryItem = async (
    memoryItem: MemoryItem,
    content_json: string,
  ) => {
    const new_node_id = v7();
    memoryItem.head_node_id = new_node_id;
    memoryItem.last_updated_at = new Date().toISOString()
    const memoryNode: MemoryNode = {
      memory_id: memoryItem.memory_id,
      node_id: new_node_id,
      created_at: new Date().toISOString(),
      content_json,
    };
    await invoke("add_new_node_to_existing_memory_item", {
      memoryItem: memoryItem,
      memoryNode: memoryNode,
    });
    return { memoryItem, memoryNode };
  };
  
  const deleteMemoryItem = async (memoryId: string): Promise<Result<never,string>> => {
    try {
      await invoke("delete_memory_item", { memoryId });
      // console.log("delete is called and tried")
      return {
        ok: true,
      }
    } catch (err) {
        // console.log("delete is called and cathced err", err)
      return {
        ok: false,
        error: String(err),
      };
    }
  };

  /**
   * sets  `node_id` as active node of `memory_id`
   * @param memory_id the memory_id whose active node id needed to be changed
   * @param node_id the node id which is to be set as active node id
   */
  const setActiveNodeIdOfMemoryItem = async (
    memory_id: string,
    node_id: string,
  ) => {
    await invoke("set_active_node_id_of_memory_item", {
      memoryId: memory_id,
      nodeId: node_id,
    });
  };
  return {
    createMemoryItem,
    addNewNodeToExistingMemoryItem,
    deleteMemoryItem,
    setActiveNodeIdOfMemoryItem,
  };
};
