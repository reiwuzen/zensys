import { useMemoryStore } from "@/store/useMemory.store";
import { MemoryItemService } from "@/service/memoryItem.service";
import { MemoryService } from "@/service/memories.service";
import { useMemo } from "react";
export const useMemory = () => {
  const {
    memory,
    setMemory,
    resetMemory,
    // setOldMemory,
    // oldMemory,
    memories,
    setMemories,
  } = useMemoryStore();
  const {
    createMemoryItem,
    addNewNodeToExistingMemoryItem,
    deleteMemoryItem,
    // loadAllMemoryItems,
  } = MemoryItemService();
  const { loadMemories, reloadMemory } = MemoryService();
  const memoryData = useMemo(
    () => ({
      memory: {
        new: memory,
        //   old: oldMemory,
      },
      memories,
    }),
    [memories, memory],
  );

  const memoryActions = {
    memory: {
      setToNull: () => setMemory(null),
      set: setMemory,
      resetMemory,
      reload: reloadMemory,
    },
    // oldMemory: {
    //   setToNull: () => setOldMemory(null),
    //   set: () => setOldMemory,
    //   copyNewMemory: () => setOldMemory(memory),
    // },
    memoryItem: {
      create: createMemoryItem,
      addNode: addNewNodeToExistingMemoryItem,
      delete: deleteMemoryItem,
    },
    memories: {
      load: async () => {
        const res = await loadMemories();

        console.log("loadMemories() result:", res);

        if (res.ok) {
          console.log("setting memories to:", res.value);
          setMemories([...res.value]);
        } else {
          console.log("load failed, clearing memories");
          setMemories([]);
        }

        return { ok: res.ok };
      },
    },
  };
  return {
    memoryData,
    memoryActions,
    // loadAllMemoryItems,
  };
};
