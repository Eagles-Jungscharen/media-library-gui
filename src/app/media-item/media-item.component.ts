import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { ActivatedRoute } from "@angular/router";
import { MediaCollectionDefinition } from "../models/media-collection-definition";
import { MediaItem, MediaItemEntry } from "../models/media-item";
import { MediaCollectionDefinitionService } from "../services/media-collection-definition.service";
import { MediaItemService } from "../services/media-item.service";
import { COMMA, ENTER, SPACE } from "@angular/cdk/keycodes";

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

  constructor(private mcdService: MediaCollectionDefinitionService, private activatedRoute: ActivatedRoute, private miService: MediaItemService) {
    this.miForm = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl(""),
      itemDate: new FormControl(""),
      author: new FormControl("", Validators.required),
      keywords: new FormControl("", Validators.required),
      mediaCollectionDefinition: new FormControl("", Validators.required),
    });
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
    return this.mediaItem.id === null;
  }
  isDisabled(): boolean {
    return !this.miForm.valid;
  }
  save() {
    this.miForm.disable();
    this.mediaItem.titel = this.miForm.get("title").value;
    this.mediaItem.description = this.miForm.get("description").value;
    this.mediaItem.author = this.miForm.get("author").value;
    this.mediaItem.keywords = this.miForm.get("keywords").value;
    //this.mediaItem.entries = mcd.items.map((item) => MediaItemEntry.build(item));
    this.miService.saveMediaItem(this.mediaItem).subscribe((item) => {
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
      this.mediaItem = item;
      this.miForm.enable();
    });
  }

  private applyModelToForm() {
    this.miForm.get("title").setValue(this.mediaItem.titel);
    this.miForm.get("description").setValue(this.mediaItem.description);
    this.miForm.get("author").setValue(this.mediaItem.author);
    this.miForm.get("itemDate").setValue(this.mediaItem.itemDate);
    this.miForm.get("keywords").setValue(this.mediaItem.keywords || []);
    const mcdElement = this.miForm.get("mediaCollectionDefinition");
    mcdElement.setValue(this.mediaItem.mediaCollectionId);
    this.mediaItem.id == "" ? mcdElement.enable() : mcdElement.disable();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.miForm.get("keywords").value.push(value);
      this.miForm.get("keywords").updateValueAndValidity();
    }

    // Reset the input value
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
}
