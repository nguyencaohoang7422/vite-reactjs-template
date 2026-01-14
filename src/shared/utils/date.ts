import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // Import tiếng Việt
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
// 1. Kích hoạt plugin để dùng được hàm .fromNow() (ví dụ: "2 giờ trước")
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isoWeek);

// 2. Thiết lập ngôn ngữ mặc định là tiếng Việt
dayjs.locale('vi');

/**
 * Tạo một hàm wrapper để không cần truyền format thủ công ở khắp nơi.
 * Bạn có thể định nghĩa các "kiểu" định dạng phổ biến của dự án tại đây.
 */
export const formatDate = (date: string | Date | number, type: 'full' | 'dateOnly' | 'timeOnly' | 'fromNow' = 'full') => {
  const instance = dayjs(date);
  switch (type) {
    case 'dateOnly':
      return instance.format('DD/MM/YYYY');
    case 'timeOnly':
      return instance.format('HH:mm');
    case 'fromNow':
      return instance.fromNow();
    case 'full':
    default:
      return instance.format('HH:mm DD/MM/YYYY');
  }
};
export { default } from 'dayjs';

