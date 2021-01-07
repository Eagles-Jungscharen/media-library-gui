import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MediaItemDefinition, MediaItemStatus, MediaItemType } from "src/app/models/media-item-definition";
import { ComponentEvent, ComponentEventType } from "src/app/utils/component-event";

@Component({
  selector: "app-media-item-definition-component",
  templateUrl: "./media-item-definition-component.component.html",
  styleUrls: ["./media-item-definition-component.component.scss"],
})
export class MediaItemDefinitionComponentComponent implements OnInit {
  @Input() item: MediaItemDefinition;
  @Input() hasDelete: boolean;
  @Output() onEditEnding = new EventEmitter<ComponentEvent<MediaItemDefinition>>();
  midForm: FormGroup;
  constructor() {
    this.midForm = new FormGroup({
      activeToggle: new FormControl(true),
      key: new FormControl("", Validators.required),
      title: new FormControl("", Validators.required),
      description: new FormControl(""),
      mediaType: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
    this.processObjectToFormGroup();
  }

  showDelete(): boolean {
    return this.hasDelete;
  }

  isValid(): boolean {
    return this.midForm.valid;
  }

  doDelete(): void {
    this.onEditEnding.emit({ element: this.item, eventType: ComponentEventType.DELETED });
  }
  doCancel(): void {
    if (!this.item.key || this.item.key === "") {
      this.onEditEnding.emit({ element: this.item, eventType: ComponentEventType.DELETED });
    } else {
      this.processObjectToFormGroup();
      this.onEditEnding.emit({ element: this.item, eventType: ComponentEventType.CANCELD });
    }
  }
  doSubmit(): void {
    this.item.description = this.midForm.get("description").value;
    this.item.key = this.midForm.get("key").value;
    this.item.title = this.midForm.get("title").value;
    this.item.type = this.midForm.get("mediaType").value as MediaItemType;
    this.item.status = this.midForm.get("activeToggle").value ? MediaItemStatus.ACTIV : MediaItemStatus.INACTIV;
    this.onEditEnding.emit({ element: this.item, eventType: ComponentEventType.CONFIRMED });
  }

  private processObjectToFormGroup(): void {
    this.midForm.get("title").setValue(this.item.title);
    this.midForm.get("key").setValue(this.item.key);
    this.midForm.get("description").setValue(this.item.description);
    this.midForm.get("mediaType").setValue(this.item.type);
    this.midForm.get("activeToggle").setValue(this.item.status === MediaItemStatus.ACTIV);
  }
}
