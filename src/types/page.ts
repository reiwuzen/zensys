import { Snapshot } from "./snapshot"
import { Tag } from "./tag"

export type PageType = | 'diary' | 'fact' | 'event' | 'generic'
export type PageMeta = {
    id: string
    type: PageType
    headSnapshotId: string 
    title: string
    createdAt: string
    tags: Tag[]
    bookId: string
    parentPageId: string
    lastOpenedAt: string
    lastUpdatedAt: string
}

export type VersionedPage = {
    pageMeta:PageMeta,
    headSnapshot: Snapshot,
    snapshots: Snapshot[]
}