import "./blockTypeMenu.scss";

export type BlockType =
  | "text"
  | "heading1"
  | "heading2"
  | "heading3"
  | "page"
  | "page-in"
  | "bullet-list"
  | "number-list"
  | "todo"
  | "toggle"
  | "code"
  | "quote"
  | "callout"
  | "equation";

type Item = {
  type: BlockType;
  label: string;
  icon: string;
  disabled?: boolean;
};

const ITEMS: Item[] = [
  { type: "text", label: "Text", icon: "T" },
  { type: "heading1", label: "Heading 1", icon: "H1" },
  { type: "heading2", label: "Heading 2", icon: "H2" },
  { type: "heading3", label: "Heading 3", icon: "H3" },
  { type: "page", label: "Page", icon: "📄" },
  { type: "page-in", label: "Page in", icon: "↪" },
  { type: "bullet-list", label: "Bulleted list", icon: "•–" },
  { type: "number-list", label: "Numbered list", icon: "1–" },
  { type: "todo", label: "To-do list", icon: "☑" },
  { type: "toggle", label: "Toggle list", icon: "▶" },
  { type: "code", label: "Code", icon: "</>" },
  { type: "quote", label: "Quote", icon: "❝" },
  { type: "callout", label: "Callout", icon: "ⓘ" },
  { type: "equation", label: "Block equation", icon: "∑", disabled: true },
];

type Props = {
  active: BlockType;
  onSelect: (type: BlockType) => void;
};

const BlockTypeMenu = ({ active, onSelect }: Props) => {
  return (
    <div className="block-type-menu">
      {ITEMS.map((item) => (
        <button
          key={item.type}
          className={`menu-item
            ${active === item.type ? "active" : ""}
            ${item.disabled ? "disabled" : ""}`}
          onMouseDown={(e) => {
            e.preventDefault(); // editor focus safety
            if (!item.disabled) onSelect(item.type);
          }}
        >
          <span className="icon">{item.icon}</span>
          <span className="label">{item.label}</span>
          {active === item.type && <span className="check">✓</span>}
          {item.type === "page-in" && <span className="arrow">›</span>}
        </button>
      ))}
    </div>
  );
};

export default BlockTypeMenu;
