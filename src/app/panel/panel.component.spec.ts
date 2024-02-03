import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { PanelComponent } from './panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DataService } from '../data.service';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  const fakeDataService = jasmine.createSpyObj<DataService>('DataService', {
    sendMessage: void {},
    setAdditionalIDsList: void {},
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: DataService, useValue: fakeDataService }],
    });
    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('PanelFormGroup', () => {
    afterEach(() => {
      fakeDataService.sendMessage.calls.reset();
      fakeDataService.setAdditionalIDsList.calls.reset();
    });

    it('ValueChanges listener called method "sendMessage" after OnInit', fakeAsync(() => {
      component.ngOnInit();
      tick(500);
      expect(fakeDataService.sendMessage).toHaveBeenCalledTimes(1);
      component.ngOnDestroy();
    }));

    it('ValueChanges listener called method "sendMessage" after inputs changed', fakeAsync(() => {
      component.ngOnInit();
      tick(500);
      const ms = fixture.debugElement.query(
        By.css('input[formControlName="ms"]')
      ).nativeElement;
      ms.value = 1000;
      ms.dispatchEvent(new Event('input'));
      tick(500);
      expect(fakeDataService.sendMessage).toHaveBeenCalledTimes(2);
      const size = fixture.debugElement.query(
        By.css('input[formControlName="size"]')
      ).nativeElement;
      size.value = 100;
      size.dispatchEvent(new Event('input'));
      tick(500);
      expect(fakeDataService.sendMessage).toHaveBeenCalledTimes(3);
      component.ngOnDestroy();
    }));

    it('ms input value less than DEFAULT_INTERVAL_MS', fakeAsync(() => {
      component.ngOnInit();
      tick(500);
      fakeDataService.sendMessage.calls.reset();
      const ms = fixture.debugElement.query(
        By.css('input[formControlName="ms"]')
      ).nativeElement;
      ms.value = 500;
      ms.dispatchEvent(new Event('input'));
      tick(500);
      expect(fakeDataService.sendMessage).not.toHaveBeenCalled();
      component.ngOnDestroy();
    }));

    it('ValueChanges listener called method "additionalIDs" after OnInit', fakeAsync(() => {
      component.ngOnInit();
      tick(500);
      expect(fakeDataService.setAdditionalIDsList).toHaveBeenCalledTimes(1);
      component.ngOnDestroy();
    }));

    it('ValueChanges listener called method "additionalIDs" after inputs changed', fakeAsync(() => {
      component.ngOnInit();
      tick(500);
      expect(fakeDataService.setAdditionalIDsList).toHaveBeenCalledTimes(1);
      const additionalIDs = fixture.debugElement.query(
        By.css('input[formControlName="additionalIDs"]')
      ).nativeElement;
      additionalIDs.value = '11111,22222';
      additionalIDs.dispatchEvent(new Event('input'));
      tick(500);
      expect(fakeDataService.setAdditionalIDsList).toHaveBeenCalledTimes(2);
      component.ngOnDestroy();
    }));
  });
});
