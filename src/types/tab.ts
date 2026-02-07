// import Editor from "@/editor/editor";
import Create from "@/workspace/create/create";
import MemorySpace from "@/workspace/memory_space/memory_space";
import Overview from "@/workspace/overview/overview";
import Settings from "@/workspace/settings/settings";
import Structure from "@/workspace/structure/structure";

export type TimelineState = {
  stateTimeId: number;
  payload?: unknown;
};

export type TabView<T extends TabType> = TabViewMap[T] extends never
  ? never
  : TabViewMap[T];

export type TabItem<T extends TabType = TabType> = {
  id: string;
  title: string;
  type: T;
  view: TabView<T>;
  isActive: boolean;
  timeline: TimelineState[];
};

export type TabStore = {
  tabs: TabItem[];
  activeTabId: string;
  setActiveTabId: (id: string) => void;
  switchTab: <T extends TabType = TabType>(
    id: string,
    type: T,
    view: TabView<T>,
  ) => void;
};

export type TabType = keyof TabViewMap;
export type TabViewMap = {
  overview: "list" | "detail";
  memory_space: "list" | "detail" | "editor";
  create: "picker" | "form";
  structure: 'add' | 'list' | 'details';
  settings: | "general"
  | "memory"
  | "privacy"
  | "intelligence"
  | "advanced";
};

export const TAB_COMPONENTS: Record<TabType, React.ComponentType> = {
  overview: Overview,
  memory_space: MemorySpace,
  create: Create,
  structure: Structure,
  settings: Settings,
  // editor: Editor,
};
