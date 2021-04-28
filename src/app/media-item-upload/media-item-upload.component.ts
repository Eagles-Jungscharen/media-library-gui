import { HttpEventType } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { MediaItem, MediaItemEntry } from "../models/media-item";
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
  @Input() readOnly: boolean;
  @Output() onItemChange = new EventEmitter<MediaItem>();

  fileName: string;
  uploadProgress: number;
  uploadSub: Subscription;
  constructor(private service: MediaItemService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (this.entry.value != null) {
      this.fileName = this.entry.value;
    }
  }
  getRequiredFileType(entry: MediaItemEntry) {
    if (this.definition.type === MediaItemType.AUDIO) {
      return ".mp3,audio/*";
    }
    return "application/pdf";
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      if (this.fileName != "") {
        this.service.deleteMediaItemContent(this.entry.mediaItemId, this.fileName, this.definition.key).subscribe((mi) => this.uploadFile(file));
      } else {
        this.uploadFile(file);
      }
    }
  }

  uploadFile(file: File) {
    this.fileName = file.name;
    this.service.getUploadFileUrl(this.entry.mediaItemId, this.fileName, this.definition.key).subscribe((uploadUrl) => {
      const upload$ = this.service.uplodadFile(uploadUrl.url, file).pipe(
        finalize(() => {
          this.service.updateMediatItemWithFileInfos(this.entry.mediaItemId, this.fileName, this.definition.key).subscribe((mediaItem) => this.reset(mediaItem));
          this._snackBar.open(this.fileName + "hochgeladen", "Schliessen", {
            horizontalPosition: "center",
            verticalPosition: "top",
          });
        })
      );
      this.uploadSub = upload$.subscribe((event) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
      });
    });
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset(null);
  }

  reset(item: MediaItem) {
    this.uploadProgress = null;
    this.uploadSub = null;
    this.onItemChange.next(item);
  }
  startUpload(fileUpload: any) {
    if (this.fileName == "" || confirm("Aktuelle Datei ersetzen?")) {
      fileUpload.click();
    }
  }
  delete() {
    if (confirm("Aktuelle Datei löschen?")) {
      this.service.deleteMediaItemContent(this.entry.mediaItemId, this.fileName, this.definition.key).subscribe((mi) => {
        this._snackBar.open(this.fileName + " gelöscht", "Schliessen", {
          horizontalPosition: "center",
          verticalPosition: "top",
        });

        this.fileName = "";
        this.reset(mi);
      });
    }
  }
  canDownload(): boolean {
    return this.entry.value != null && this.entry.value != "" && this.entry.downloadUrl != null && this.entry.downloadUrl != "";
  }
}
