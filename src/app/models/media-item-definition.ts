export enum MediaItemStatus {
  ACTIV = "activ",
  INACTIV = "inactiv",
}

export enum MediaItemType {
  TEXT = "text",
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
  status: MediaItemStatus;
}
