import { MediaItemDefinition } from "./media-item-definition";

export class MediaCollectionDefinition {
  id: string;
  title: string;
  description: string;
  items: MediaItemDefinition[] = [];
}
