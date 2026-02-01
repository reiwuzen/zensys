import "./editor.scss";
import { useEffect, useRef } from "react";
import BlockMenu from "./blockMenu";
import { useEditorZen } from "./useEditorZen";
import { focusEnd } from "@/helper/focusEl";

const Editor = () => {
  const pendingFocusId = useRef<string | null>(null);
  const {
    blocks,
    openMenu,
    setOpenMenu,
    insertBlockAfter,
    changeBlockType,
    deleteBlock,
    updateBlockContent,
  } = useEditorZen();

  useEffect(() => {
  if (!pendingFocusId.current) return;

  const el = blockRefs.current.get(pendingFocusId.current);
  if (el) {
    focusEnd(el);
  }

  pendingFocusId.current = null;
}, [blocks]);

  /* ---------- DOM refs (local, NOT in store) ---------- */
  const blockRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const blockMenuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="editor">
      <div className="editable-content">
        {blocks.map((block) => (
          <div className="editor-block-row" key={block.id}>
            {/* ---------- CONTROLS ---------- */}
            <div
              className={`editor-block-controls ${openMenu ? "active" : ""}`}
            >
              <button
                className="add"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenMenu(openMenu === "add" ? null : "add");
                }}
              >
                +
              </button>

              <button
                className="drag"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenMenu(openMenu === "more" ? null : "more");
                }}
              >
                ⋮⋮
              </button>
            </div>

            {/* ---------- CONTENT ---------- */}
            <div
              className="editor-block-content"
              contentEditable
              suppressContentEditableWarning
              data-type={block.type}
              ref={(el) => {
                if (el) blockRefs.current.set(block.id, el);
              }}
              onKeyDown={(e) => {
                /* Backspace → delete empty block */
                if (
                  e.key === "Backspace" &&
                  block.content === "" &&
                  blocks.length > 1
                ) {
                  e.preventDefault();
                  pendingFocusId.current = deleteBlock(block.id);

                  return;
                }

                /* Enter → insert block */
                if (e.key === "Enter") {
                  e.preventDefault();
                 pendingFocusId.current =  insertBlockAfter(block.id, block.type);
                 
                }
              }}
              onInput={(e) =>
                updateBlockContent(block.id, e.currentTarget.textContent ?? "")
              }
            />

            {/* ---------- MENU ---------- */}
            {openMenu && (
              <BlockMenu
                block={block}
                type={openMenu}
                blockMenuRef={blockMenuRef as React.RefObject<HTMLDivElement>}
                onClose={() => setOpenMenu(null)}
                onClick_text={() => {
                 pendingFocusId.current =  insertBlockAfter(block.id, "text");
                  
                  setOpenMenu(null);
                }}
                onClick_heading1={() => {
                  block.content === ""
                    ? pendingFocusId.current =  changeBlockType(block.id, "heading1")
                    : pendingFocusId.current =  insertBlockAfter(block.id, "heading1");
                  
                  setOpenMenu(null);
                }}
                onClick_heading2={() => {
                  block.content === ""
                    ? pendingFocusId.current =  changeBlockType(block.id, "heading2")
                    : pendingFocusId.current =  insertBlockAfter(block.id, "heading2");
                  
                  setOpenMenu(null);
                }}
                onClick_bulletlist={() => {
                  block.content === ""
                    ? pendingFocusId.current =  changeBlockType(block.id, "bullet-list")
                    : pendingFocusId.current =  insertBlockAfter(block.id, "bullet-list");
                  
                  setOpenMenu(null);
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Editor;
