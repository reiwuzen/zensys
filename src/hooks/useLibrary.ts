import { useLibraryStore } from "@/store/useLibrary.store";
import { useMemo } from "react";
import { PageService } from "@/service/page.service";
export const useLibrary = () => {
  const {pages,setPages,activePage,setActivePage } = useLibraryStore();
  const {
    createPage,
    createNewSnapshotOfPage,
    deletePage,
    update_last_opened_at_MetadataOfMemoryItem,
    loadPages,
    reloadPage,
  } = PageService();
  const pagesStore = useMemo(() => {
    return {
      activePage: activePage,
      pages,
    };
  }, [activePage, pages]);

  const pageActions = {
    activePage: {
      clear: () => setActivePage(null),
      set: setActivePage,
      reload: reloadPage,
    },

    page: {
      create: createPage,
      createNewSnapshot: createNewSnapshotOfPage,
      delete: deletePage,
      updateLastOpened: update_last_opened_at_MetadataOfMemoryItem,
    },
    pages: {
      load: async () => {
        const res = await loadPages();
        if (res.ok) {
          setPages([...res.value]);
        } else {
          setPages([]);
        }
        return { ok: res.ok };
      },
    },
  };
  return {
    pagesStore,
    pageActions,
  };
};
