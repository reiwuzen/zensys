import "./blockMenu.scss";



type BlockMenuProps = {
  onClose: () => void;
  blockMenuRef: React.RefObject<HTMLDivElement>;
  onClick_text: () => void
  onClick_heading1: () => void;
  onClick_heading2: () => void;
};

const BlockMenu = ({ onClose, blockMenuRef, onClick_text, onClick_heading1, onClick_heading2 }: BlockMenuProps) => {
  return (
    <div
      ref={blockMenuRef}
      className="blockMenu"
      onMouseDown={(e) => e.stopPropagation()} // keep menu open
    >
      <div className="menu">
        <div className="menu-section">Basic blocks</div>

        <div className="menu-item" onClick={()=>onClick_text()}>
          <div className="menu-item-identifier">T</div>
          <div className="menu-item-label">Text</div>
          <div className="menu-item-hint">Enter</div>
        </div>

        <div className="menu-item" onClick={()=>onClick_heading1()}>
          <div className="menu-item-identifier">H1</div>
          <div className="menu-item-label">Heading 1</div>
          <div className="menu-item-hint">#</div>
        </div>

        <div className="menu-item" onClick={()=>onClick_heading2()}>
          <div className="menu-item-identifier">H2</div>
          <div className="menu-item-label">Heading 2</div>
          <div className="menu-item-hint">##</div>
        </div>

        <div className="menu-item">
          <div className="menu-item-identifier">•</div>
          <div className="menu-item-label">Bulleted list</div>
          <div className="menu-item-hint">-</div>
        </div>

        <div className="menu-item">
          <div className="menu-item-identifier">—</div>
          <div className="menu-item-label">Divider</div>
        </div>

        <div className="menu-section">Close menu</div>

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
    </div>
  );
};

export default BlockMenu;
