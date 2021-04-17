import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { MediaItem } from "../models/media-item";
import { MediaItemService } from "../services/media-item.service";
import { MediaItemTableDataSource } from "./media-item-table-datasource";

@Component({
  selector: "app-media-item-table",
  templateUrl: "./media-item-table.component.html",
  styleUrls: ["./media-item-table.component.scss"],
})
export class MediaItemTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<MediaItem>;
  dataSource: MediaItemTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["publish", "titel", "date", "author"];

  constructor(private service: MediaItemService) {}

  ngOnInit() {
    this.dataSource = new MediaItemTableDataSource(this.service);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  loading(): boolean {
    return this.dataSource.loading;
  }
}
