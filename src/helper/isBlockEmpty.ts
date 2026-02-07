import type {  AnyBlock } from "@/types/editor";

export function isBlockContentEmpty(block: AnyBlock): boolean {
  switch (block.type) {
    case "code":
      return block.content.text.trim().length === 0;

    case "equation":
      return block.content.latex.trim().length === 0;

    default:
      return block.content.length === 0;
  }
}
