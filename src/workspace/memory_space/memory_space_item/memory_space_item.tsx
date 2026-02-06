import { useActiveTab } from "@/hooks/useActiveTab";
import "./memory_space_item.scss";
import { MemoryItemService } from "@/service/memoryItemService";
import { Memory, useMemoryStore } from "@/store/useMemoryStore";
import { useEffect } from "react";

type MemorySpaceItemProps = {
  memory: Memory;
};

const MemorySpaceItem = ({ memory }: MemorySpaceItemProps) => {
  // const [editable, setEditable] = useState(false);
  const { deleteMemoryItem } = MemoryItemService();
  const { setActiveTabView } = useActiveTab();
  const { memory: sMemory, setMemory, reloadMemory } = useMemoryStore();
  const { activeNode } = memory;

  return (
    <article className="memory-node">
      <button
        className="memory-node-edit-btn"
        onClick={(e) => {
          e.stopPropagation();
          // e.preventDefault();
          {
            memory &&
              setMemory({
                memoryItem: memory.memoryItem,
                activeNode: memory.activeNode,
                nodes: memory.nodes,
              });
          }
          setActiveTabView("editor");
        }}
      >
        Edit
      </button>
      <button
        className="memory-node-delete-btn"
        onClick={async (e) => {
          e.stopPropagation();
          const ok = await deleteMemoryItem(activeNode.memory_id);
          if (!ok) {
            // show toast, log, scream, something
            return;
          }
          setActiveTabView("list");
        }}
      >
        Delete
      </button>
      <header className="memory-node__header">
        <h1 className="memory-node__title">{activeNode.title}</h1>

        <time className="memory-node__timestamp">
          {new Date(activeNode.created_at).toLocaleString()}
        </time>
      </header>

      <section
        className="memory-node__content"
        // onClick={()=>{}}
      >
        {/* <Editor content={activeNode.content} editable={editable}></Editor> */}
        {activeNode.content_json}
      </section>
    </article>
  );
};

export default MemorySpaceItem;
