import { useState } from "react";
import "./blockMenu.scss";
import BlockTypeMenu from "./blockTypeMenu";
// import TextColorMenu from "./textColorMenu";
import { BlockType } from "@/types/editor";
import { BLOCK_ITEMS } from "@/constants/editor";
import type { AnyBlock } from "@/types/editor";

type BlockMenuMode = "add" | "more";

type BlockMenuProps = {
  blockMenuRef : React.RefObject<HTMLDivElement>;
  block: AnyBlock;
  mode: BlockMenuMode;
  onClose: () => void;

  onAddBlock: (type:BlockType) => void;
  onChangeBlockType: (b:AnyBlock) => void;
};

const BlockMenu = ({
  blockMenuRef,
  block,
  mode,
  onClose,
  onAddBlock,
  onChangeBlockType,
}: BlockMenuProps) => {
  const [activeMenuType, setActiveMenuType] = useState<"change" | "color">(null);

  if (mode === "add") {
    return (
      <div
      ref={blockMenuRef}
        className="blockMenu"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="menu">
          <div className="menu-section">Basic blocks</div>

          {BLOCK_ITEMS.map((item) => (
            <div
              key={item.type}
              className="menu-item"
              onMouseDown={(e) => {
                e.preventDefault();
                onAddBlock(item.type);
                onClose();
              }}
            >
              <div className="menu-item-identifier">
                {item.icon}
              </div>
              <div className="menu-item-label">
                {item.label}
              </div>
              {item.hint && (
                <div className="menu-item-hint">
                  {item.hint}
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          className="menu-item close-menu"
          onMouseDown={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <div className="menu-item-label">Close</div>
          <div className="menu-item-hint">Esc</div>
        </div>
      </div>
    );
  }

  // ---------- MORE ----------
  return (
    <div
      className="blockMenu more"
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="more-header">
        <div className="more-title">Block</div>
        <div className="more-subtitle">{block.type}</div>
      </div>

      {/* Tabs */}
      <div className="more-tabs">
        <button
          className={activeMenuType === "change" ? "active" : ""}
          onClick={() => setActiveMenuType("change")}
        >
          Change
        </button>
        {activeMenuType === 'change' && <BlockTypeMenu selectedBlock={block} onChangeType={(b)=>onChangeBlockType(b)}/>}
        <button
          className={activeMenuType === "color" ? "active" : ""}
          onClick={() => setActiveMenuType("color")}
        >
          Color
        </button>
        {activeMenuType === 'color' && ''}
      </div>

      
    </div>
  );
};

export default BlockMenu;
