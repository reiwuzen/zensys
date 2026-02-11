// import { v7 } from "uuid";
// import { MemoryNode, MemoryType } from "@/memory/schema";

import { Tag } from "@/types/tag";
import { invoke } from "@tauri-apps/api/core";

export const MemoryNodeService = () => {
  const addTagsToMemoryItem = async (
    memoryId: string,
    nodeId: string,
    newTags: Tag[],
  ) => {
    
    try {
      await invoke("upsert_tag_on_memory_item", {
        memoryId: memoryId,
        newTags: newTags,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } 
  };
  const deleteTagFromMemoryItem = async () =>{
    try{
      return true
    }catch(err){
      console.log(err)
      return false
    }
  }
  return {
    addTagsToMemoryItem,
    deleteTagFromMemoryItem,
  };
};
