import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { MediaItem } from "../models/media-item";
import { UploadUrl } from "../models/upload-url";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class MediaItemService {
  constructor(private client: HttpClient, private authenticationService: AuthenticationService) {}

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

  getAllMediaItem(): Observable<MediaItem[]> {
    return this.client.get<MediaItem[]>(environment.mediaHost + "/api/mediaitem");
  }

  getUploadFileUrl(id: string, fileName: string, itemKey: string) {
    return this.client
      .post<UploadUrl>(environment.mediaHost + "/api/GetUploadUrl", { TargetMediaItemId: id, MediaName: fileName, MediaKey: itemKey })
      .pipe(tap((uploadUrl) => this.authenticationService.addMediaByPassUrl(uploadUrl.url)));
  }

  uplodadFile(url: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);

    return this.client.put(url, formData, {
      reportProgress: true,
      observe: "events",
      headers: { "x-ms-blob-type": "BlockBlob" },
    });
  }
  updateMediatItemWithFileInfos(id: string, fileName: string, itemKey: string): Observable<MediaItem> {
    return this.client.post<MediaItem>(environment.mediaHost + "/api/updateMediaItem", { MediaItemId: id, MediaName: fileName, MediaKey: itemKey });
  }
  deleteMediaItemContent(id: string, fileName: string, itemKey: string): Observable<MediaItem> {
    return this.client.post<MediaItem>(environment.mediaHost + "/api/deleteMediaItemContent", { MediaItemId: id, MediaName: fileName, MediaKey: itemKey });
  }

  publishItem(item: MediaItem) {
    return this.client.post<MediaItem>(environment.mediaHost + "/api/publishMediaItem", item);
  }
  unpublishItem(item: MediaItem) {
    return this.client.post<MediaItem>(environment.mediaHost + "/api/unpublishMediaItem", item);
  }
}
