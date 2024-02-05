import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/* @Pipe({ name: 'dateCompareNumber' })
export class DateCompareNumber implements PipeTransform {
  offset = new Date().getTimezoneOffset();
  transform(input: Date|string): string {
    let date: string[] = moment(input).zone(this.offset).format('MM-DD-YYYY').split('-');
    let transformeDate: string = date[1] + "-" + date[0] + "-" + date[2];
    return transformeDate.split('-').reverse().join('');
  }
}
 */
