import { AnyBlock } from "@/types/editor";
import "./blockEditor.scss";
import { useEditorZen } from "@/hooks/useEditorZen";
import { toast } from "sonner";
import { RefObject,  useState } from "react";

type props = {
  initialText: string;
  pendingFocusId: RefObject<string>
  block: AnyBlock;
  hydratedBlocks: RefObject<Set<string>>;
  blockRefs: RefObject<Map<string, HTMLSpanElement>>;
  handleInput: (el: React.FormEvent<HTMLSpanElement>, block: AnyBlock) => void;
  handleKeydown: (e: React.KeyboardEvent, block: AnyBlock) => void;
};

const BlockEditor = ({
  initialText,
  pendingFocusId,
  block,
  handleInput,
  handleKeydown,
  hydratedBlocks,
  blockRefs,
}: props) => {
  const { editable, openMenuActions, updateBlock } = useEditorZen();
//   const blockRef = useRef(null);
  const [hoveredBlock, setHoveredBlock] = useState<boolean>(false);
  return (
    <div className="block-editor"
    onMouseEnter={()=> setHoveredBlock(true)}
    onMouseLeave={()=>setHoveredBlock(false)}
    onMouseDown={()=>{
        if (pendingFocusId.current === block.id) return
        pendingFocusId.current = block.id
    }}
    >
      {hoveredBlock && (
        <div className="block-editor-controls">
          <button
            className="add"
            onClick={() => {
              openMenuActions.set({ blockId: block.id, mode: "add" });
            }}
          >
            +
          </button>
          <button
            className="drag"
            onClick={() => {
              openMenuActions.set({ blockId: block.id, mode: "more" });
            }}
          >
            ⋮⋮
          </button>
        </div>
      )}
      <div
        className="block-editor-area"
        data-type={block.type}
        // data-meta-type={block.type === "list-item" ? block.meta.style : ""}
        data-meta-depth={
          block.type === "bullet" ||
          block.type === "todo" ||
          block.type === "number"
            ? block.meta.depth
            : ""
        }
        data-meta-checked={block.type === "todo" ? block.meta.checked : ""}
      >
        <span
          className="block-editor-styles-area"
          onClick={(e) => {
            e.stopPropagation();
            if (editable === true && block.type === "todo") {
              updateBlock.meta(block.id, {
                ...block.meta,
                checked: !block.meta.checked,
              });

            } else {
              toast.info("Set memory-item to be editable");
            }
          }}
        />
        <span
          className="block-editor-text-area"
          contentEditable={editable}
          suppressContentEditableWarning
          ref={(el) => {
            if (!el) return;
            blockRefs.current.set(block.id, el);
            if (hydratedBlocks.current.has(block.id)) return;
            el.textContent = initialText;
            hydratedBlocks.current.add(block.id);
          }}
          onInput={(e) => handleInput(e, block)}
          onKeyDown={(e) => handleKeydown(e, block)}
        />
      </div>
    </div>
  );
};
export default BlockEditor;
