import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { ActivatedRoute } from "@angular/router";
import { MediaCollectionDefinition } from "../models/media-collection-definition";
import { MediaItem, MediaItemEntry } from "../models/media-item";
import { MediaCollectionDefinitionService } from "../services/media-collection-definition.service";
import { MediaItemService } from "../services/media-item.service";
import { COMMA, ENTER, SPACE } from "@angular/cdk/keycodes";
import { DateAdapter } from "@angular/material/core";
import { Subscription } from "rxjs";
import { MediaItemDefinition } from "../models/media-item-definition";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as moment from "moment";

@Component({
  selector: "app-media-item",
  templateUrl: "./media-item.component.html",
  styleUrls: ["./media-item.component.scss"],
})
export class MediaItemComponent implements OnInit {
  private mcdLoaded = false;
  private itemLoaded = false;
  private mediaItem: MediaItem;
  miForm: FormGroup;
  mediaCollectionDefinitions: MediaCollectionDefinition[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  removable = true;
  selectable = true;
  fileName: string;
  uploadProgress: number;
  uploadSub: Subscription;
  readOnly: boolean;

  constructor(
    private mcdService: MediaCollectionDefinitionService,
    private activatedRoute: ActivatedRoute,
    private miService: MediaItemService,
    private _adapter: DateAdapter<any>,
    private _snackBar: MatSnackBar
  ) {
    this.miForm = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl(""),
      itemDate: new FormControl(""),
      author: new FormControl("", Validators.required),
      keywords: new FormControl([], Validators.required),
      mediaCollectionDefinition: new FormControl("", Validators.required),
    });
    this._adapter.setLocale(navigator.language);
  }

  ngOnInit(): void {
    this.mcdService.getMediaCollectionDefinitions().subscribe((definitions) => {
      this.mediaCollectionDefinitions = definitions;
      this.mcdLoaded = true;
    });
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.miService.getMediaItemById(paramMap.get("id")).subscribe((mi) => {
        this.mediaItem = mi;
        this.applyModelToForm();
        this.itemLoaded = true;
      });
    });
  }

  isLoaded(): boolean {
    return this.mcdLoaded && this.itemLoaded;
  }
  isNew(): boolean {
    return this.mediaItem.id === "@new";
  }
  isInvalid(): boolean {
    return !this.miForm.valid;
  }
  isDisabled(): boolean {
    return this.miForm.disabled;
  }
  save() {
    this.miForm.disable();
    this.mediaItem.titel = this.miForm.get("title").value;
    this.mediaItem.description = this.miForm.get("description").value;
    this.mediaItem.author = this.miForm.get("author").value;
    this.mediaItem.keywords = this.miForm.get("keywords").value;
    this.mediaItem.itemDate = this.miForm.get("itemDate").value.toISOString(true);
    this.miService.saveMediaItem(this.mediaItem).subscribe((item) => {
      this._snackBar.open("Eintrag gespeichert", "Schliessen", {
        horizontalPosition: "center",
        verticalPosition: "top",
      });

      this.mediaItem = item;
      this.miForm.enable();
    });
  }

  create() {
    this.miForm.disable();
    this.mediaItem.titel = this.miForm.get("title").value;
    this.mediaItem.description = this.miForm.get("description").value;
    this.mediaItem.author = this.miForm.get("author").value;
    const mcdId: string = this.miForm.get("mediaCollectionDefinition").value;
    this.mediaItem.mediaCollectionId = mcdId;
    this.mediaItem.id = "@new";
    const mcd = this.mediaCollectionDefinitions.find((search) => search.id == mcdId);
    this.mediaItem.entries = mcd.items.map((item) => MediaItemEntry.build(item));
    this.mediaItem.keywords = this.miForm.get("keywords").value;
    this.miService.saveMediaItem(this.mediaItem).subscribe((item) => {
      this._snackBar.open("Neuer Eintrag erstellt.", "Schliessen", {
        horizontalPosition: "center",
        verticalPosition: "top",
      });

      this.mediaItem = item;
      this.miForm.enable();
    });
  }

  private applyModelToForm() {
    if (this.mediaItem.published) {
      this.miForm.disable();
    } else {
      this.miForm.enable();
    }
    this.miForm.get("title").setValue(this.mediaItem.titel);
    this.miForm.get("description").setValue(this.mediaItem.description);
    this.miForm.get("author").setValue(this.mediaItem.author);
    this.miForm.get("itemDate").setValue(moment(this.mediaItem.itemDate));
    this.miForm.get("itemDate").disable();
    this.miForm.get("keywords").setValue(this.mediaItem.keywords || []);
    const mcdElement = this.miForm.get("mediaCollectionDefinition");
    if (this.mediaItem.id === "@new") {
      mcdElement.enable();
    } else {
      mcdElement.setValue(this.mediaItem.mediaCollectionId);
      mcdElement.disable();
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || "").trim()) {
      this.miForm.get("keywords").value.push(value);
      this.miForm.get("keywords").updateValueAndValidity();
    }
    if (input) {
      input.value = "";
    }
  }

  remove(keyword: string): void {
    const index = this.miForm.get("keywords").value.indexOf(keyword);
    if (index >= 0) {
      this.miForm.get("keywords").value.splice(index, 1);
      this.miForm.get("keywords").updateValueAndValidity();
    }
  }
  entries(): MediaItemEntry[] {
    return this.mediaItem.entries;
  }
  getMediaItemDefinition(entry: MediaItemEntry): MediaItemDefinition {
    return this.mediaCollectionDefinitions.find((mcd) => mcd.id === this.mediaItem.mediaCollectionId).items.find((ci) => ci.key == entry.collectionItemKey);
  }
  publishItem(): void {
    this.miService.publishItem(this.mediaItem).subscribe((item) => {
      this._snackBar.open("Veröffentlicht", "Schliessen", {
        horizontalPosition: "center",
        verticalPosition: "top",
      });
      this.mediaItem = item;
      this.applyModelToForm();
    });
  }
  unpublishItem(): void {
    this.miService.unpublishItem(this.mediaItem).subscribe((item) => {
      this._snackBar.open("Zurückgezogen / Bereit zum Bearbeiten", "Schliessen", {
        horizontalPosition: "center",
        verticalPosition: "top",
      });

      this.mediaItem = item;
      this.applyModelToForm();
    });
  }
  canPublish(): boolean {
    return this.isLoaded() && !this.mediaItem.published && !this.isNew() && !this.miForm.disabled;
  }
  canUnpublish(): boolean {
    return this.isLoaded() && this.mediaItem.published && !this.isNew();
  }
  canSave(): boolean {
    return !this.mediaItem.published && !this.isNew();
  }
  itemUpdate(item: MediaItem) {
    this.mediaItem = item;
  }
}
