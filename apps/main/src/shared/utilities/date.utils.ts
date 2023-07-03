// import * as dayjs from 'dayjs';
// import { QUnitType } from 'dayjs';
import 'dayjs/locale/ko';

// dayjs.locale('ko');

export class DateUtils {
  public static findDayOfWeek(dayOfWeekNumber: string): string {
    let dayOfWeek = '';
    switch (dayOfWeekNumber) {
      case '1':
        dayOfWeek = '일';
        break;

      case '2':
        dayOfWeek = '월';
        break;

      case '3':
        dayOfWeek = '화';
        break;

      case '4':
        dayOfWeek = '수';
        break;

      case '5':
        dayOfWeek = '목';
        break;

      case '6':
        dayOfWeek = '금';
        break;

      case '7':
        dayOfWeek = '토';
        break;

      default:
        break;
    }

    return dayOfWeek;
  }

  // public static getFormatTime(time: Date, format: string) {
  //   return dayjs(time).format(format);
  // }

  // public static diffTime(
  //   mainTime: string,
  //   subStractTime: string,
  //   unit: QUnitType,
  // ) {
  //   return dayjs(mainTime).diff(subStractTime, unit);
  // }
}
