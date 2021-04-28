import { MediaCollectionDefinition } from "./media-collection-definition";
import { MediaItemDefinition } from "./media-item-definition";

export class MediaItem {
  id: string;
  mediaCollectionId: string;
  creator: string;
  created: string;
  itemDate: string;
  published: boolean;
  titel: string;
  description: string;
  author: string;
  keywords: string[] = [];
  entries: MediaItemEntry[] = [];
}
export class MediaItemEntry {
  mediaItemId: string;
  collectionItemKey: string;
  value: string;
  downloadUrl: string;

  static build(mcd: MediaItemDefinition): MediaItemEntry {
    const item = new MediaItemEntry();
    item.collectionItemKey = mcd.key;
    return item;
  }
}
