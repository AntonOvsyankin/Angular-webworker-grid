import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PanelFormGroup } from './panel.formGroup';
import { DataService } from '../data.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {
  formGroup: PanelFormGroup;

  constructor(private dataService: DataService) {
    this.formGroup = new PanelFormGroup(this.dataService);
  }

  ngOnInit() {
    this.formGroup.initListeners();
  }

  ngOnDestroy() {
    this.formGroup.closeSubscriptions();
  }
}
