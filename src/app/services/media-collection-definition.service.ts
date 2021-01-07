import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "process";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { MediaCollectionDefinition } from "../models/media-collection-definition";

@Injectable({
  providedIn: "root",
})
export class MediaCollectionDefinitionService {
  constructor(private client: HttpClient) {}

  getMediaCollectionDefinitionById(id: string): Observable<MediaCollectionDefinition> {
    if (id === "@new") {
      return of(new MediaCollectionDefinition());
    } else {
      return this.client.get<MediaCollectionDefinition>(environment.mediaHost + "/api/mcd/" + id);
    }
  }
  saveMediaCollectionDefinition(mcd: MediaCollectionDefinition): Observable<MediaCollectionDefinition> {
    return this.client.post<MediaCollectionDefinition>(environment.mediaHost + "/api/mcd/", mcd);
  }
  getMediaCollectionDefinitions(): Observable<MediaCollectionDefinition[]> {
    return this.client.get<MediaCollectionDefinition[]>(environment.mediaHost + "/api/mcd");
  }
}
