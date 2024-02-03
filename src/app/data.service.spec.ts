import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { GridRow, IGridRow } from './app.model';

describe('AppService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  describe('setAdditionalIDsList', () => {
    it('Get an emprty string', (done: DoneFn) => {
      service.additionalIDsList$.subscribe((value) => {
        expect(value).toEqual([]);
        done();
      });
      service.setAdditionalIDsList('');
    });

    it('Get ","', (done: DoneFn) => {
      service.additionalIDsList$.subscribe((value) => {
        expect(value).toEqual([]);
        done();
      });
      service.setAdditionalIDsList(',');
    });

    it('Get valid string', (done: DoneFn) => {
      service.additionalIDsList$.subscribe((value) => {
        expect(value).toEqual(['1', '2', '3']);
        done();
      });
      service.setAdditionalIDsList('1,2,3');
    });

    it('Params length > 10', (done: DoneFn) => {
      const mockList = Array.from(Array(10).keys(), (_, i) => String(i));
      service.additionalIDsList$.subscribe((value) => {
        expect(value).toEqual(mockList);
        done();
      });
      service.setAdditionalIDsList(mockList.join(',') + ',10,11');
    });
  });

  describe('getEditedGridRows', () => {
    it('Data and additionalIDs are empty', (done: DoneFn) => {
      const rows$ = service.getEditedGridRows();
      rows$.subscribe(list => {
        expect(list).toEqual([]);
        done();
      });
      service.data$.next([]);
      service.additionalIDsList$.next([]);
    });

    it('Data is empty and additionalIDs is not empty', (done: DoneFn) => {
      const rows$ = service.getEditedGridRows();
      rows$.subscribe(list => {
        expect(list).toEqual([]);
        done();
      });
      service.data$.next([]);
      service.additionalIDsList$.next(['1', '2', '3']);
    });

    it('Data length more than additionalIDs length', (done: DoneFn) => {
      const rows$ = service.getEditedGridRows();
      rows$.subscribe(list => {
        expect(list[0].id).toEqual('10');
        expect(list[1].id).toEqual('11');
        done();
      });
      service.data$.next(getGridRowList(3));
      service.additionalIDsList$.next(['10','11']);
    });

    it('Data length less than additionalIDs length', (done: DoneFn) => {
      const rows$ = service.getEditedGridRows();
      rows$.subscribe(list => {
        expect(list[0].id).toEqual('10');
        expect(list[1]).toBeUndefined();
        done();
      });
      service.data$.next(getGridRowList(1));
      service.additionalIDsList$.next(['10','11']);
    });

  });
});

function getGridRowList(length: number): IGridRow[] {
  const gridRow = new GridRow({
    id: '1',
    int: 1,
    float: 1.11111,
    color: 'red',
    child: { id: '1', color: 'red' },
  });
  let index = 0;
  let list = [];
  while (index < length) {
    list.push(gridRow);
    index++;
  }
  return list;
}
