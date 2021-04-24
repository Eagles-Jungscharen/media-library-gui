import { HttpEventType } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { MediaCollectionDefinition } from "../models/media-collection-definition";
import { MediaItemEntry } from "../models/media-item";
import { MediaItemDefinition, MediaItemType } from "../models/media-item-definition";
import { MediaItemService } from "../services/media-item.service";

@Component({
  selector: "app-media-item-upload",
  templateUrl: "./media-item-upload.component.html",
  styleUrls: ["./media-item-upload.component.scss"],
})
export class MediaItemUploadComponent implements OnInit {
  @Input() entry: MediaItemEntry;
  @Input() definition: MediaItemDefinition;
  fileName: string;
  uploadProgress: number;
  uploadSub: Subscription;
  constructor(private service: MediaItemService) {}

  ngOnInit(): void {
    console.log("INIT...");
  }
  getRequiredFileType(entry: MediaItemEntry) {
    if (this.definition.type === MediaItemType.AUDIO) {
      return ".mp3,audio/*";
    }
    return "application/pdf";
  }

  onFileSelected(event) {
    console.log(event);
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      console.log(file);
      this.service.getUploadFileUrl(this.entry.mediaItemId, this.fileName).subscribe((uploadUrl) => {
        console.log(uploadUrl);
        const upload$ = this.service.uplodadFile(uploadUrl.url, file).pipe(finalize(() => this.reset()));
        this.uploadSub = upload$.subscribe((event) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
        });
      });
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
