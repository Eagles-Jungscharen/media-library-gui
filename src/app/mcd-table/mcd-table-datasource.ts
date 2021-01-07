import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { map } from "rxjs/operators";
import { Observable, of as observableOf, merge, BehaviorSubject } from "rxjs";
import { MediaCollectionDefinitionService } from "../services/media-collection-definition.service";
import { MediaCollectionDefinition } from "../models/media-collection-definition";

/**
 * Data source for the McdTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class McdTableDataSource extends DataSource<MediaCollectionDefinition> {
  data: MediaCollectionDefinition[] = [];
  paginator: MatPaginator;
  sort: MatSort;
  dataContainer$: BehaviorSubject<MediaCollectionDefinition[]> = new BehaviorSubject<MediaCollectionDefinition[]>([]);

  constructor(private mcdService: MediaCollectionDefinitionService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<MediaCollectionDefinition[]> {
    this.mcdService.getMediaCollectionDefinitions().subscribe((result) => this.dataContainer$.next(result));
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [this.dataContainer$.asObservable(), this.paginator.page, this.sort.sortChange];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.dataContainer$.getValue()]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: MediaCollectionDefinition[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MediaCollectionDefinition[]) {
    if (!this.sort.active || this.sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === "asc";
      switch (this.sort.active) {
        case "title":
          return compare(a.title, b.title, isAsc);
        case "description":
          return compare(a.description, b.description, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
