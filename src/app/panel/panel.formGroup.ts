import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import {
  Observable,
  Subscription,
  combineLatest,
  debounceTime,
  filter,
  map,
  startWith,
} from 'rxjs';
import { DEFAULT_INTERVAL_MS, DEFAULT_ROW_LENGTH } from '../../global/constants';
import { PanelFormControls } from './panel.model';

export class PanelFormGroup extends FormGroup<PanelFormControls> {
  private messageParamsSubscription: Subscription = new Subscription();
  private additionalIDsSubscription: Subscription = new Subscription();

  constructor(private dataService: DataService) {
    super({
      ms: new FormControl(DEFAULT_INTERVAL_MS),
      size: new FormControl(DEFAULT_ROW_LENGTH),
      additionalIDs: new FormControl(''),
    });
  }

  get ms(): FormControl<number> {
    return this.get('ms') as FormControl;
  }

  get size(): FormControl<number> {
    return this.get('size') as FormControl;
  }

  get additionalIDs(): FormControl<string | null> {
    return this.get('additionalIDs') as FormControl;
  }

  public initListeners(): void {
    this.messageParamsSubscription = combineLatest([
      this.ms.valueChanges.pipe(parseFormControls(DEFAULT_INTERVAL_MS), filter(value => value >= DEFAULT_INTERVAL_MS)),
      this.size.valueChanges.pipe(parseFormControls(DEFAULT_ROW_LENGTH)),
    ])
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.dataService.sendMessage({ ms: value[0], size: value[1] });
      });

    this.additionalIDsSubscription = this.additionalIDs.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500)
      )
      .subscribe((IDs) => {
        this.dataService.setAdditionalIDsList(IDs as string);
      });
  }

  closeSubscriptions() {
    this.messageParamsSubscription.unsubscribe();
    this.additionalIDsSubscription.unsubscribe();
  }
}

function parseFormControls(defaultValue: number) {
  return function <T>(source: Observable<T>) {
    return source.pipe(
      startWith(defaultValue),
      map((value) => Number(value))
    );
  };
}
