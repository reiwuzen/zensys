import { useActiveTab } from "@/hooks/useActiveTab";
import "./memory_space_item.scss";
import { MemoryItemService } from "@/service/memoryItemService";
import { Memory, useMemoryStore } from "@/store/useMemoryStore";
import { useTags } from "@/hooks/useTag";
import { useEffect, useRef, useState } from "react";
import Editor from "@/editor/editor";
import { useEditorZen } from "@/editor/useEditorZen";
import { Block } from "@/types/editor";
type MemorySpaceItemProps = {
  memory: Memory;
};

const MemorySpaceItem = ({ memory }: MemorySpaceItemProps) => {
  // const [editable, setEditable] = useState(false);
  const { deleteMemoryItem } = MemoryItemService();
  const { setActiveTabView } = useActiveTab();
  const { tags, addTagToNode } = useTags();
  const [showTagPicker, setShowTagPicker] = useState<boolean>(false);
  const { setMemory, reloadMemory } = useMemoryStore();
  const { activeNode } = memory;
  const tagPickerRef = useRef<HTMLDivElement>(null);

  const nodeTagIds = new Set(activeNode.tags.map((t) => t.id));

  const availableTags = tags.filter((tag) => !nodeTagIds.has(tag.id));
  const {setBlocks, setEditable} = useEditorZen();
  
  useEffect(()=>{
    const b: Block[] = JSON.parse(activeNode.content_json);
    console.log(activeNode.content_json)
    console.log(b);
    setBlocks(b)
    const handleTagPicker = (e:MouseEvent)=>{
      if(tagPickerRef.current && 
        !tagPickerRef.current.contains(e.target as Node)
      ) setShowTagPicker(false)
    }
    document.addEventListener('mousedown',handleTagPicker)
    return () => document.removeEventListener('mousedown',handleTagPicker)
  },[])
  // console.log(JSON.parse(activeNode.content_json))
  return (
    <article className="memory-node">
      <div className="memory-node-accessory-bar">
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
            setEditable(true)
            // setActiveTabView("editor");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            color="black"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
        <button
          className="memory-node-add_tag-btn"
          onClick={async (e) => {
            e.stopPropagation();
            setShowTagPicker(true);
            // const ok = await addTagToNode(activeNode.memory_id,activeNode.node_id,)
          }}
        >
          Add Tag
        </button>
        {showTagPicker && (
          <div ref={tagPickerRef} className="tag-picker">
            <div className="tag-picker__header">
              <span>Tags</span>
            </div>

            <ul className="tag-picker__list">
              {availableTags.length === 0 && (
                <li className="tag-picker__empty">No tags found</li>
              )}

              {availableTags.map((t) => (
                <li
                  key={t.id}
                  className="tag-picker__item"
                  onClick={() => {
                    const ok = addTagToNode(
                      activeNode.memory_id,
                      activeNode.node_id,
                      t,
                    );
                    if (!ok) {
                      //toast
                    }
                    setShowTagPicker(false);
                    reloadMemory(activeNode.memory_id)
                  }}
                >
                  {t.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <header className="memory-node__header">
        <h1 className="memory-node__title">{activeNode.title}</h1>

        <time className="memory-node__timestamp">
          {new Date(activeNode.created_at).toLocaleString()}
        </time>
      </header>
      <ul className="memory-node__tags">
        {activeNode.tags.length > 0 ? (
          activeNode.tags.map((t) => (
            <li className="tag" key={t.id}>
              {t.label}
            </li>
          ))
        ) : (
          <li className="no-tags">No Tags available</li>
        )}
      </ul>
      <section
        className="memory-node__content"
        // onClick={()=>{}}
      >
        <Editor />
        {/* {JSON.parse(activeNode.content_json)} */}
        {/* <Editor content={activeNode.content} editable={editable}></Editor> */}
        {/* {activeNode.content_json} */}
      </section>
    </article>
  );
};

export default MemorySpaceItem;
