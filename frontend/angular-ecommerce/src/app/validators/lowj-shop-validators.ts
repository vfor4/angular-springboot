import { FormControl, ValidationErrors } from "@angular/forms";

export class LowjShopValidators {

    static notOnlyWhiteSpace(formControl: FormControl): ValidationErrors {

        if ((formControl.value != null) && (formControl.value.trim().length == 0)) {
            return { 'notOnlyWhiteSpace': true };
        } else {
            return null;
        }

    }
}
