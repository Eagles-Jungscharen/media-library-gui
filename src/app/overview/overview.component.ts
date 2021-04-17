import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { MediaItem } from "../models/media-item";
import { MediaCollectionDefinitionService } from "../services/media-collection-definition.service";
import { CardMenuItem } from "./card/card.component";

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"],
})
export class OverviewComponent implements OnInit {
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
          definitions: { cols: 1, rows: 2 },
        };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 3, rows: 4 },
        definitions: { cols: 1, rows: 4 },
      };
    })
  );
  mcdMenuItems: CardMenuItem[] = [
    { title: "Neue Definition", actionVerb: "NEW" },
    { title: "Übersicht", actionVerb: "OVERVIEW" },
  ];
  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private mcdService: MediaCollectionDefinitionService) {}

  ngOnInit(): void {
    this.mcdService.getMediaCollectionDefinitions().subscribe((mcds) => console.log("FOUND: " + mcds));
  }

  doMCDMenuItemClick(verb: string) {
    console.log("UND HIER: " + verb);
    if ("OVERVIEW" === verb) {
      //TODO: Route to Overview
      this.router.navigateByUrl("/mcdoverview");
    }
    if ("NEW" === verb) {
      this.router.navigateByUrl("/mediacollectiondefinition/@new");
    }
  }
  createMediaItem() {
    this.router.navigateByUrl("/mediaitem/@new");
  }
  openMediaItem(item: MediaItem) {
    this.router.navigateByUrl("/mediaitem/" + item.id);
  }
}
