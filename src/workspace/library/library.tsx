import "./library.scss";
import MemorySpaceList from "./libraryList/libraryList";
import MemorySpaceItem from "./libraryItem/libraryItem";
import { useActiveTab } from "@/hooks/useActiveTab";
import { useLibrary } from "@/hooks/useLibrary";

const Library = () => {
  const { activeTab } = useActiveTab();
  const { pagesStore } = useLibrary();
  const selectedPage = pagesStore.activePage;
  if (!activeTab) return <p>Null</p>;
  // const {memory: editorMemory} = useEditorZen();

  return (
    <div className="library">
      {activeTab.view === "list" && <MemorySpaceList />}
      {activeTab.view === "detail" && selectedPage && <MemorySpaceItem />}
    </div>
  );
};

export default Library;
