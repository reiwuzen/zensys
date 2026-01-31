import { useEffect, useRef, useState } from "react";
import "./editor.scss";
import BlockMenu from "./blockMenu";
import { focusEnd } from "@/helper/focusEl";
import { BlockType } from "./blockTypeMenu";

// export type BlockType =
//   | "text"
//   | "heading1"
//   | "heading2"
//   | "bullet-list"
//   | "divider"
//   | "number-list"
//   | "quote";

type Block = {
  id: string;
  content: string;
  type: BlockType;
};

const Editor = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: crypto.randomUUID(), content: "", type: "text" },
  ]);

  const [openMenu, setOpenMenu] = useState<null | "add" | "more" | "drag">(null);

  const blockRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const blockMenuRef = useRef<HTMLDivElement>(null);

  /* -----------------------------
     Click outside → close menu
  -------------------------------- */
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (
        blockMenuRef.current &&
        !blockMenuRef.current.contains(e.target as Node)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  /* -----------------------------
     Single source of truth:
     insert block after index
  -------------------------------- */
  const deleteBlock = (index: number) => {
      if (blocks.length === 1) return;
    const id = index > 0 ? blocks[index - 1].id : null;
    setBlocks((prev) => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
    requestAnimationFrame(() => {
      if (id) {
        const el = blockRefs.current.get(id);
        if (el) {
            focusEnd(el)
        }
    }});
  };
  const insertBlockAfter = (index: number, type: BlockType) => {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      content: "",
      type,
    };

    setBlocks((prev) => {
      const next = [...prev];
      next.splice(index + 1, 0, newBlock);
      return next;
    });

    requestAnimationFrame(() => {
      blockRefs.current.get(newBlock.id)?.focus();
    });
  };

  const changeBlockType = (index: number, type: Block["type"]) => {
    setBlocks((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], type };
      return next;
    });
  };

  const backSpaceHandler = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number,
    text: string,
  ) => {
    if (text === "" && e.key === "Backspace") {
      e.preventDefault();
      deleteBlock(index);
    }
  };
  /* -----------------------------
     Enter key handler
  -------------------------------- */
  const handleEnter = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number,
    type: BlockType = "text",
  ) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    insertBlockAfter(index, type);
  };

  return (
    <div className="editor">
      <div className="editable-content">
        {blocks.map((block, index) => (
          <div className="editor-block-row" key={block.id}>
            <div
              className={`editor-block-controls ${openMenu ? "active" : ""}`}
            >
              <button
                className="add"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenMenu((prev) => (prev === "add" ? null : "add"));
                }}
              >
                +
              </button>

              <button
                className="drag"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenMenu((prev) => (prev === "more" ? null : "more"));
                  console.log("drag")
                }}
              >
                ⋮⋮
              </button>
            </div>

            <div
              className="editor-block-content"
              contentEditable
              suppressContentEditableWarning
              data-type={block.type}
              ref={(el) => {
                if (el) blockRefs.current.set(block.id, el);
              }}
              onKeyDown={(e) => {
                backSpaceHandler(e, index, block.content);
                block.type === "bullet-list" &&
                  handleEnter(e, index, "bullet-list");
                block.type !== "bullet-list" && handleEnter(e, index);
              }}
              onInput={(e) => {
                const text = e.currentTarget.textContent ?? "";

                setBlocks((prev) => {
                  const next = [...prev];
                  next[index] = { ...next[index], content: text };
                  return next;
                });
              }}
            >
              
            </div>

            {(openMenu === "add" || openMenu === "more") && index === blocks.length - 1 && (
              <BlockMenu
              blockType={block.type}
              type={openMenu}
                blockMenuRef={blockMenuRef as React.RefObject<HTMLDivElement>}
                onClose={() => setOpenMenu(null)}
                onClick_text={() => {
                  insertBlockAfter(index, "text");
                  setOpenMenu(null);
                }}
                onClick_heading1={() => {
                  insertBlockAfter(index, "heading1");
                  setOpenMenu(null);
                }}
                onClick_heading2={() => {
                  insertBlockAfter(index, "heading2");
                  setOpenMenu(null);
                }}
                onClick_bulletlist={() => {
                  insertBlockAfter(index, "bullet-list");
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
