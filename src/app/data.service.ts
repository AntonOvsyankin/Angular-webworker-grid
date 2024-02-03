import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  combineLatest,
  map,
  of,
  switchMap,
} from 'rxjs';
import { IMessageParams, IGridRow, GridRow } from './app.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data$: Subject<IGridRow[]> = new Subject<IGridRow[]>;

  additionalIDsList$: Subject<string[]> = new Subject<string[]>;

  private worker: Worker;

  constructor() {
    this.worker = new Worker(new URL('./app.worker', import.meta.url));

    this.initListeners();
  }

  sendMessage(params: IMessageParams): void {
    this.worker.postMessage(params);
  }

  setAdditionalIDsList(additionalIDs: string): void {
    this.additionalIDsList$.next(
      [...additionalIDs.split(',')].filter((val) => val.length).slice(0,10)
    );
  }

  /**
     * Edit current list of rows.
     *
     * @param gridRows current list of rows
     *
     * @param additionalIDsList additionalIDsList from panelComponent formGroup
     *
     * @param asyncValidator A single async validator or array of async validator functions
     *
     * @returns {IGridRow[]} edited row list with updated ids
     */

  editGridRows(gridRows: IGridRow[], additionalIDsList: string[]): IGridRow[] {
    let list = [...gridRows].map((el) => new GridRow(el));
    additionalIDsList.forEach((value, index) => {
      if (list[index]) {
        list[index].id = value;
      }
    });
    return list;
  }

  /**
     * Waiting for rows and additionalIDsList (default is empty). After that taking last 10 elements and call function to update ids
     *
     * @returns {Observable<IGridRow[]>} Observable to keep track of changes
     */

  getEditedGridRows(): Observable<IGridRow[]> {
    return combineLatest([
      this.data$.pipe(map((list) => list.slice(-10))),
      this.additionalIDsList$,
    ]).pipe(switchMap(([rows, ids]) => of(this.editGridRows(rows, ids))));
  }

  private initListeners(): void {
    this.worker.onmessage = ({ data }) => {
      const list = data.map((el: IGridRow) => new GridRow(el));
      this.data$.next(list);
    };
  }
}
