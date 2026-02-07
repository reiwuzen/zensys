import type { AnyBlock, Block, BlockType } from "@/types/editor";


export function widenBlock<T extends BlockType>(
  block: Block<T>
): AnyBlock {
  return block as AnyBlock;
}
