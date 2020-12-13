export enum MediaItemStatus {
  ACTIV = "activ",
  INACTIV = "inactiv",
}

export enum MediaItemType {
  LINK = "link",
  AUDIO = "audio",
  PDF = "pdf",
  VIDEO = "video",
  PICTURE = "picture",
}

export class MediaItemDefinition {
  key: string;
  title: string;
  description: string;
  type: MediaItemType;
}
