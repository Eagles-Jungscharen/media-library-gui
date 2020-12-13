import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MediaCollectionDefinition } from "../models/media-collection-definition";
import { MediaCollectionDefinitionService } from "../services/media-collection-definition.service";

@Component({
  selector: "app-media-collection-definition",
  templateUrl: "./media-collection-definition.component.html",
  styleUrls: ["./media-collection-definition.component.scss"],
})
export class MediaCollectionDefinitionComponent implements OnInit {
  mcdForm: FormGroup;
  mcd: MediaCollectionDefinition;

  constructor(private mcdService: MediaCollectionDefinitionService, private route: ActivatedRoute, private router: Router) {
    this.mcdForm = new FormGroup({ title: new FormControl("", Validators.required), description: new FormControl("", Validators.required) });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.mcdService.getMediaCollectionDefinitionById(paramMap.get("id")).subscribe((mcd) => {
        this.mcd = mcd;
        this.applyModelToForm();
      });
    });
  }
  isLoaded(): boolean {
    return this.mcd != null;
  }
  isDisabled(): boolean {
    return this.mcdForm.invalid;
  }
  save(): void {
    this.mcd.title = this.mcdForm.get("title").value;
    this.mcd.description = this.mcdForm.get("description").value;
    this.mcdForm.disable();
    this.mcdService.saveMediaCollectionDefinition(this.mcd).subscribe((mcd) => {
      this.mcd = mcd;
      this.applyModelToForm();
      this.mcdForm.enable();
    });
  }
  private applyModelToForm() {
    this.mcdForm.get("title").setValue(this.mcd.title);
    this.mcdForm.get("description").setValue(this.mcd.description);
  }
}
