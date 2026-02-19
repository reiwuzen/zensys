import { v7 } from "uuid";
import { MemoryItem } from "@/memory/schema";
import { invoke } from "@tauri-apps/api/core";
import { createBlock } from "@/helper/createBlock";
import { Result } from "@/types/result";
import { PageMeta, VersionedPage, PageType } from "@/types/page";
import { Snapshot } from "@/types/snapshot";
// import { Memory } from "@/types/memory";
export const PageService = () => {
  const createPage = async (
    title: string,
    type: PageType,
  ): Promise<Result<PageMeta>> => {
    const pageId = v7();
    const snapshotId = v7();
    const pageMeta: PageMeta = {
      id: pageId,
      title,
      createdAt: new Date().toISOString(),
      headSnapshotId: snapshotId,
      type: type,
      bookId: null,
      parentPageId: null,
      lastOpenedAt:new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      tags: [],
    };
    const snapshot: Snapshot = {
      parentSnapshotId: null,
      id: snapshotId,
      createdAt: new Date().toISOString(),
      pageId,
      contentJson: JSON.stringify([createBlock("paragraph")]),
    };

    try {
      await invoke("create_page_with_initial_snapshot", {
        pageMeta: pageMeta,
        snapshot: snapshot,
      });
      return {
        ok: true,
        value: pageMeta,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  };
  const createNewSnapshotOfPage = async (
    pageMeta: PageMeta,
    contentJson: string,
  ): Promise<Result<[PageMeta, Snapshot]>> => {
    const newSnapshotId = v7();

    const updatedPageMeta = {
  ...pageMeta,
  headSnapshotId: newSnapshotId,
  lastUpdatedAt: new Date().toISOString(),
};
    const snapshot: Snapshot = {
      pageId: pageMeta.id,
      id: newSnapshotId,
      createdAt: new Date().toISOString(),
      contentJson,
      parentSnapshotId: null,
    };
   
    
    try {
      await invoke("create_new_snapshot_of_page", {
        pageMeta: updatedPageMeta,
        snapshot: snapshot,
      });
      return {
        ok: true,
        value: [pageMeta, snapshot],
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  };

  const deletePage = async (
    pageId: string,
  ): Promise<Result<never, string>> => {
    try {
      await invoke("delete_page", { pageId });
      // console.log("delete is called and tried")
      return {
        ok: true,
      };
    } catch (err) {
      // console.log("delete is called and cathced err", err)
      return {
        ok: false,
        error: String(err),
      };
    }
  };


  const loadPages = async (): Promise<Result<VersionedPage[], string>> => {
      try {
        const value = await invoke<VersionedPage[]>("load_all_pages");
        return {
          ok: true,
          value,
        };
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    };
    const reloadPage = async (id: string) : Promise<Result<VersionedPage,string>>=>{
      try{
          const value = await invoke<VersionedPage>("load_page_details",{
              memoryId:id
          })
          return{
              ok:true,
              value
          }
      }catch(error){
          return{
              ok:false,
              error
          }
      }
    } 


  
  const update_last_opened_at_MetadataOfMemoryItem = async (
    memoryItem: MemoryItem,
  ): Promise<Result> => {
    try {
      memoryItem.last_opened_at = new Date().toISOString();
      await invoke("update_memory_item_metadata", {
        memoryItem: memoryItem,
      });
      console.log("setting new time to: ", new Date().toISOString());
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  };
  return {
    createPage,
    createNewSnapshotOfPage,
    deletePage,
    update_last_opened_at_MetadataOfMemoryItem,
    loadPages,
    reloadPage
  };
};
