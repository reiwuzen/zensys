import { useMemory } from "@/hooks/useMemory";
import "./memory_space_list.scss";
// import { MemoryItem, MemoryNode } from "@/memory/schema";
import {  useEffect,useState } from "react";
import { useActiveTab } from "@/hooks/useActiveTab";

const MemorySpaceList = () => {
  const {memoryData, memoryActions} =useMemory()
  const {setActiveTabTypeAndView} =useActiveTab();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  let cancelled = false;

  setLoading(true);
  (async()=>{

    await memoryActions.memories
    .load()
    .catch(err => {
      if (!cancelled) setError(String(err));
    })
    .finally(() => {
      if (!cancelled) setLoading(false);
    });
  })()
  return () => {
    cancelled = true;
  };
}, []);



console.log(memoryData.memories)  

  if (loading) {
    return <div className="memory-space-list">Loading…</div>;
  }

  if (error) {
    return <div className="memory-space-list error">{error}</div>;
  }
  // if (memoryData.memories.length === 0) return
  return (
    <div className="memory-space-list">
      <h1>Memory Space</h1>

      <div className="memory-space-list-items">
        {memoryData.memories.map(({memory_item:item , head_node: head_node,nodes }) => (
          <div
            key={item.memory_id}
            className="memory-space-list-item"
            onClick={()=>{
              memoryActions.memory.set({memory_item:item,head_node:head_node,nodes})
              setActiveTabTypeAndView('memory_space','detail')
            }}
          >
            <h2>{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MemorySpaceList;
