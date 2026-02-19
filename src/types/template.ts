/**
 * templates.ts 
 * type
 */

import type { PageType } from "./page";

export type PageTemplate = {
  id: string;
  label: string;
  description: string;
  pageType: PageType;
  initialTitle: string;
  initialContent?: string;
};

