export type Snapshot = {
  id: string;
  pageId: string
  parentSnapshotId: string;
  contentJson: string;
  createdAt: string;
  comment?: string;
};

// export type Snapshots = Snapshot[];
