import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { MediaCollectionDefinition } from "../models/media-collection-definition";
import { MediaItemDefinition, MediaItemStatus } from "../models/media-item-definition";
import { MediaCollectionDefinitionService } from "../services/media-collection-definition.service";
import { ComponentEvent, ComponentEventType } from "../utils/component-event";

@Component({
  selector: "app-media-collection-definition",
  templateUrl: "./media-collection-definition.component.html",
  styleUrls: ["./media-collection-definition.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
    ]),
  ],
})
export class MediaCollectionDefinitionComponent implements OnInit {
  mcdForm: FormGroup;
  mcd: MediaCollectionDefinition;
  displayedColumns: string[] = ["title", "key", "type", "action"];
  dataSource = new MatTableDataSource<MediaItemDefinition>();
  itemToEdit: MediaItemDefinition;

  constructor(private mcdService: MediaCollectionDefinitionService, private route: ActivatedRoute, private router: Router) {
    this.mcdForm = new FormGroup({ title: new FormControl("", Validators.required), description: new FormControl("", Validators.required) });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.mcdService.getMediaCollectionDefinitionById(paramMap.get("id")).subscribe((mcd) => {
        this.mcd = mcd;
        this.applyModelToForm();
        this.updateDataSource();
      });
    });
  }
  isLoaded(): boolean {
    return this.mcd != null;
  }
  isDisabled(): boolean {
    return this.mcdForm.invalid;
  }
  isItemEdited(): boolean {
    return this.itemToEdit != null;
  }
  save(): void {
    this.mcd.title = this.mcdForm.get("title").value;
    this.mcd.description = this.mcdForm.get("description").value;
    this.mcdForm.disable();
    this.mcdService.saveMediaCollectionDefinition(this.mcd).subscribe((mcd) => {
      this.mcd = mcd;
      this.applyModelToForm();
      this.updateDataSource();
      this.mcdForm.enable();
    });
  }
  private applyModelToForm() {
    this.mcdForm.get("title").setValue(this.mcd.title);
    this.mcdForm.get("description").setValue(this.mcd.description);
  }
  addItem() {
    const item = new MediaItemDefinition();
    item.status = MediaItemStatus.ACTIV;
    this.itemToEdit = item;
    this.mcd.items.push(item);
    this.updateDataSource();
    console.log(this.mcd.items);
  }
  itemEdited(event: ComponentEvent<MediaItemDefinition>) {
    console.dir(event);
    if (event.eventType === ComponentEventType.DELETED) {
      const index = this.mcd.items.indexOf(event.element, 0);
      if (index > -1) {
        this.mcd.items.splice(index, 1);
      }
    }
    this.itemToEdit = null;
    this.updateDataSource();
  }
  editItem(item: MediaItemDefinition) {
    this.itemToEdit = item;
  }
  itemsCanBeDeleted(): boolean {
    return this.mcd && this.mcd.id === "@new";
  }
  private updateDataSource() {
    this.dataSource.data = this.mcd.items;
  }
}
