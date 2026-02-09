import { Memory } from "@/types/memory";
import { Result } from "@/types/result";
import { invoke } from "@tauri-apps/api/core";

export const MemoryService = () => {
  const loadMemories = async (): Promise<Result<Memory[], string>> => {
    try {
      const value = await invoke<Memory[]>("load_all_memories");
      return {
        ok: true,
        value,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  };
  const reloadMemory = async (id: string) : Promise<Result<Memory,string>>=>{
    try{
        const value = await invoke<Memory>("load_memory_payload",{
            memoryId:id
        })
        return{
            ok:true,
            value
        }
    }catch(error){
        return{
            ok:false,
            error
        }
    }
  } 
  return {
    loadMemories,
    reloadMemory
  };
};
