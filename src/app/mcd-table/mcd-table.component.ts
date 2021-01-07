import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { MediaCollectionDefinition } from "../models/media-collection-definition";
import { MediaCollectionDefinitionService } from "../services/media-collection-definition.service";
import { McdTableDataSource } from "./mcd-table-datasource";

@Component({
  selector: "app-mcd-table",
  templateUrl: "./mcd-table.component.html",
  styleUrls: ["./mcd-table.component.scss"],
})
export class McdTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<MediaCollectionDefinition>;
  dataSource: McdTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["title", "description"];

  constructor(private mcdService: MediaCollectionDefinitionService) {}

  ngOnInit() {
    this.dataSource = new McdTableDataSource(this.mcdService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
