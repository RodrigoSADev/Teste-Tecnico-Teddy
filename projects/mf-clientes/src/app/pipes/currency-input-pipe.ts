import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyInput',
})
export class CurrencyInputPipe implements PipeTransform {
  transform(
    value: any,
    currency: string = 'BRL',
    locale: string = 'pt-BR'
  ): string {
    if (value === null || value === undefined) return '';
    let number: number;

    if (typeof value === 'number') {
      number = value;
    } else {
      const numeric = value.toString().replace(/\D/g, '');
      number = Number(numeric) / 100;
    }

    return number.toLocaleString(locale, { style: 'currency', currency });
  }
}
