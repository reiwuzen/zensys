import { useState } from "react";
import "./blockMenu.scss";
// import { BlockType } from "./editor";
import { BlockType } from "./blockTypeMenu";
import BlockTypeMenu from "./blockTypeMenu";
import TextColorMenu from "./textColorMenu";

type BlockMenuProps = {
  blockType: BlockType;
  type: "add" | "more" | "drag";
  onClose: () => void;
  blockMenuRef: React.RefObject<HTMLDivElement>;
  onClick_text: () => void;
  onClick_heading1: () => void;
  onClick_heading2: () => void;
  onClick_bulletlist: () => void;
};

const BlockMenu = ({
  blockType,
  type,
  onClose,
  blockMenuRef,
  onClick_text,
  onClick_heading1,
  onClick_heading2,
  onClick_bulletlist,
}: BlockMenuProps) => {
  const [blockTypeMenuToggle, setBlockTypeMenuToggle] = useState(false);
  const [textColorMenuToggle, setTextColorMenuToggle] = useState(false);

  if (type === "add") {
    return (
      <div
        ref={blockMenuRef}
        className="blockMenu"
        onMouseDown={(e) => e.stopPropagation()} // keep menu open
      >
        <div className="menu">
          <div className="menu-section">Basic blocks</div>

          <div className="menu-item" onClick={() => onClick_text()}>
            <div className="menu-item-identifier">T</div>
            <div className="menu-item-label">Text</div>
            <div className="menu-item-hint">Enter</div>
          </div>

          <div className="menu-item" onClick={() => onClick_heading1()}>
            <div className="menu-item-identifier">H1</div>
            <div className="menu-item-label">Heading 1</div>
            <div className="menu-item-hint">#</div>
          </div>

          <div className="menu-item" onClick={() => onClick_heading2()}>
            <div className="menu-item-identifier">H2</div>
            <div className="menu-item-label">Heading 2</div>
            <div className="menu-item-hint">##</div>
          </div>

          <div className="menu-item" onClick={() => onClick_bulletlist()}>
            <div className="menu-item-identifier">•</div>
            <div className="menu-item-label">Bulleted list</div>
            <div className="menu-item-hint">-</div>
          </div>

          <div className="menu-item">
            <div className="menu-item-identifier">—</div>
            <div className="menu-item-label">Divider</div>
          </div>

          <div className="menu-section">Close menu</div>
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
  if (type === "more") {
  return (
    <div
      ref={blockMenuRef}
      className="blockMenu more"
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="more-header">
        <div className="more-title">Block</div>
        <div className="more-subtitle">{blockType}</div>
      </div>

      {/* Tabs */}
      <div className="more-tabs">
        <button
          className={blockTypeMenuToggle ? "active" : ""}
          onClick={() => {
            setBlockTypeMenuToggle(true);
            setTextColorMenuToggle(false);
          }}
        >
          Change
        </button>
        <button
          className={textColorMenuToggle ? "active" : ""}
          onClick={() => {
            setBlockTypeMenuToggle(false);
            setTextColorMenuToggle(true);
          }}
        >
          Color
        </button>
      </div>

      {/* Panel */}
      <div className="more-panel">
        {blockTypeMenuToggle && (
          <BlockTypeMenu
            active={blockType}
            onSelect={(type) => {
              // TODO: wire changeBlockType
            }}
          />
        )}

        {textColorMenuToggle && (
          <TextColorMenu
            active="default"
            onSelect={(color) => {
              // TODO: wire color
            }}
          />
        )}
      </div>
    </div>
  );
}

  return null;
};

export default BlockMenu;
