import { TabType } from "@/types/tab";
import Create from "@/workspace/create/create";
import Library from "@/workspace/library/library";
import Overview from "@/workspace/overview/overview";
import Structure from "@/workspace/structure/structure";

export const TAB_COMPONENTS: Record<TabType, React.ComponentType> = {
  overview: Overview,
  library: Library,
  create: Create,
  structure: Structure,
  // editor: Editor,
};