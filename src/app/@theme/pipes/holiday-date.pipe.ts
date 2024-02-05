import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment';


@Pipe({ name: 'holidayDate' })
export class HolidayDatePipe implements PipeTransform {
  transform(input: Date): string {
    moment.locale('fr');
    return moment(input).format('LL , HH:mm');;
  }
}
