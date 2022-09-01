import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function jituEmailValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }
        return value.split('@')[1]!=='thejitu.com' ? {passwordStrength:true}: null;
    }
}