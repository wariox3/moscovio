import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Validador personalizado que convierte strings vacíos a null
 * Útil para mantener consistencia en los datos enviados al backend,
 * especialmente para campos opcionales que deben ser null cuando están vacíos
 *
 * @returns Una función validadora que convierte strings vacíos a null sin generar errores
 *
 * @example
 * ```typescript
 * // Uso en un FormControl
 * new FormControl('', [emptyStringToNullValidator()])
 *
 * // Uso combinado con otros validadores
 * new FormControl('', [emptyStringToNullValidator(), Validators.maxLength(20)])
 * ```
 */
export function emptyStringToNullValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.value === '') {
      control.setValue(null, { emitEvent: false });
    }
    return null;
  };
}
