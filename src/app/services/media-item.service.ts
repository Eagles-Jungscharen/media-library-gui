import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { MediaItem } from "../models/media-item";

@Injectable({
  providedIn: "root",
})
export class MediaItemService {
  constructor(private client: HttpClient) {}

  getMediaItemById(id: string): Observable<MediaItem> {
    if (id == "@new") {
      return of(new MediaItem());
    } else {
      return this.client.get<MediaItem>(environment.mediaHost + "/api/mediaitem/" + id);
    }
  }

  saveMediaItem(mediaItem: MediaItem): Observable<MediaItem> {
    return this.client.post<MediaItem>(environment.mediaHost + "/api/mediaitem", mediaItem);
  }
}
