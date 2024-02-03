import { AbstractControl, FormControl } from "@angular/forms";

export interface IPanelForm {
  ms: FormControl<number | null>;
  size: FormControl<number | null>;
  additionalIDs: FormControl<string | null>;
}

export type PanelFormControls = { [key in keyof IPanelForm]: AbstractControl };
