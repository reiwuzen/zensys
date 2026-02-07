import {
  Block,
  BlockType,
  BLOCK_DEFAULT_META,
  BLOCK_DEFAULT_CONTENT,
} from "@/types/editor";

export function createBlock<T extends BlockType= BlockType>(type: T): Block<T> {
  return {
    id: crypto.randomUUID(),
    type,
    meta: structuredClone(BLOCK_DEFAULT_META[type]),
    content: structuredClone(BLOCK_DEFAULT_CONTENT[type]),
  };
}
