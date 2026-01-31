import "./textColorMenu.scss";

export type TextColor =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red";

type ColorOption = {
  key: TextColor;
  label: string;
};

const COLORS: ColorOption[] = [
  { key: "default", label: "Default text" },
  { key: "gray", label: "Gray text" },
  { key: "brown", label: "Brown text" },
  { key: "orange", label: "Orange text" },
  { key: "yellow", label: "Yellow text" },
  { key: "green", label: "Green text" },
  { key: "blue", label: "Blue text" },
  { key: "purple", label: "Purple text" },
  { key: "pink", label: "Pink text" },
  { key: "red", label: "Red text" },
];

type Props = {
  active?: TextColor;
  onSelect: (color: TextColor) => void;
};

const TextColorMenu = ({ active = "default", onSelect }: Props) => {
  return (
    <div className="text-color-menu">
      <div className="menu-section-title">Text color</div>

      {COLORS.map((item) => (
        <button
          key={item.key}
          className={`menu-item ${
            active === item.key ? "active" : ""
          }`}
          onMouseDown={(e) => {
            e.preventDefault(); // ← DO NOT REMOVE (keeps editor focus)
            onSelect(item.key);
          }}
        >
          <span className={`color-icon ${item.key}`}>A</span>
          <span className="label">{item.label}</span>
        </button>
      ))}

      <div className="menu-divider" />

      <div className="menu-section-title muted">
        Background color
      </div>
    </div>
  );
};

export default TextColorMenu;
