import { AnyBlock, BlockType } from "@/types/editor";
import { BLOCK_DEFAULT_CONTENT, BLOCK_DEFAULT_META } from "@/constants/editor";

export function migrateBlock(
  block: AnyBlock,
  nextType: BlockType
): AnyBlock {
  // same type? do nothing
  if (block.type === nextType) return block;

  // inline-capable → inline-capable
  if (isInline(block.type) && isInline(nextType)) {
    // const newBlock = widenBlock(createBlock(nextType))
    return {
      ...block,
      type: nextType,
      meta: BLOCK_DEFAULT_META[nextType],
      content: block.content,
    } as AnyBlock;
  }

  // paragraph → list-item
  if (block.type === "paragraph" && nextType === "bullet") {
    return {
      ...block,
      type: "bullet",
      meta: {
        
        depth: 0,
      },
      content: block.content,
    };
  }

  // list-item → paragraph
  if (block.type === "bullet" && nextType === "paragraph") {
    return {
      ...block,
      type: "paragraph",
      meta: {},
      content: block.content,
    };
  }

  // fallback: destructive but explicit
  return {
    ...block,
    type: nextType,
    meta: BLOCK_DEFAULT_META[nextType],
    content: BLOCK_DEFAULT_CONTENT[nextType],
  } as AnyBlock;
}


function isInline(type: BlockType) {
  return !["code", "equation"].includes(type);
}
