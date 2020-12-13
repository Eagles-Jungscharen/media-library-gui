import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-media-collection-definition",
  templateUrl: "./media-collection-definition.component.html",
  styleUrls: ["./media-collection-definition.component.scss"],
})
export class MediaCollectionDefinitionComponent implements OnInit {
  mcdForm: FormGroup;

  constructor() {
    this.mcdForm = new FormGroup({ title: new FormControl(), description: new FormControl() });
  }

  ngOnInit(): void {}
  save(): void {}
}
