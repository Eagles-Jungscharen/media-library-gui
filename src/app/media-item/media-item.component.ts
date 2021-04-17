import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MediaCollectionDefinition } from "../models/media-collection-definition";
import { MediaItem, MediaItemEntry } from "../models/media-item";
import { MediaCollectionDefinitionService } from "../services/media-collection-definition.service";
import { MediaItemService } from "../services/media-item.service";

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
  save() {}

  create() {
    this.miForm.disable();
    this.mediaItem.titel = this.miForm.get("title").value;
    this.mediaItem.description = this.miForm.get("description").value;
    this.mediaItem.author = this.miForm.get("author").value;

    const mcd: MediaCollectionDefinition = this.miForm.get("mediaCollectionDefinition").value;
    this.mediaItem.mediaCollectionId = mcd.id;
    this.mediaItem.id = "@new";
    this.mediaItem.entries = mcd.items.map((item) => MediaItemEntry.build(item));
    this.miService.saveMediaItem(this.mediaItem).subscribe((item) => {
      this.mediaItem = item;
      this.miForm.enable();
    });
  }

  private applyModelToForm() {}
}
