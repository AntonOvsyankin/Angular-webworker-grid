import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridComponent } from './grid.component';
import { GridRow, IGridRow } from '../app.model';
import { By } from '@angular/platform-browser';
import { DataService } from '../data.service';
import { of } from 'rxjs';

const MockedDataService = {
  getEditedGridRows: () => of(getGridRowList()),
};

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridComponent],
      providers: [{ provide: DataService, useValue: MockedDataService }],
    });
    fixture = TestBed.createComponent(GridComponent);
    service = TestBed.inject(DataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Display grid with data', (done: DoneFn) => {
    component.rows$.subscribe(() => {
      const grid = fixture.debugElement.query(By.css('.grid'));
      expect(grid).toBeTruthy();
      done();
    });
  });

  it('Grid row created', (done: DoneFn) => {
    component.rows$.subscribe(() => {
      const row = fixture.debugElement.query(By.css('.grid-row'));
      expect(row).toBeTruthy();
      const child = row.children[row.children.length - 1].nativeElement;
      expect(child).toHaveClass('child');
      done();
    });
  });

  it('Grid color column has background-color', (done: DoneFn) => {
    component.rows$.subscribe(() => {
      const row = fixture.debugElement.query(By.css('.grid-row'));
      const index = component.headers.findIndex((val) => val === 'color');
      const colorColumn = row.children[index];
      expect(
        colorColumn.query(By.css('span')).nativeElement.style.backgroundColor
      ).toBe('red');
      done();
    });
  });
});

function getGridRowList(): IGridRow[] {
  const row = new GridRow({
    id: '1',
    int: 1,
    float: 1.11111,
    color: 'red',
    child: { id: '1', color: 'red' },
  });
  const list = [row, row, row];
  return list;
}
