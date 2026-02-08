// import { v7 } from "uuid";
// import { MemoryNode, MemoryType } from "@/memory/schema";

import { Tag } from "@/types/tag";
import { invoke } from "@tauri-apps/api/core";

export const MemoryNodeService = () => {
  const addTagsToNode = async (
    memoryId: string,
    nodeId: string,
    newTags: Tag[],
  ) => {
    try {
      await invoke("add_tags_to_node", {
        memoryId: memoryId,
        nodeId: nodeId,
        newTags: newTags,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } 
  };
  const deleteTagFromNode = async () =>{
    try{
      return true
    }catch(err){
      console.log(err)
      return false
    }
  }
  return {
    addTagsToNode,
    deleteTagFromNode,
  };
};
