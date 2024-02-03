import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IGridRow } from '../app.model';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  headers: string[] = ['id', 'int', 'float', 'color', 'child'];

  rows$: Observable<IGridRow[]> = this.dataService.getEditedGridRows();

  constructor(private dataService: DataService) {
    this.dataService = new DataService();
  }

  rowByInt(index: number, item: IGridRow){
    return item.int;
  }
}
