
/**
 * 指定された日付を時間:分 (年/月/日)の形式で返す。
 *
 * @param date 日付と時刻が含まれたDate型のオブジェクト
 * @returns 日付を時間:分 (年/月/日)の形式で表した文字列
 */
function GetTimeStamp(date: Date): string {
  // 年を4桁で表示する。
  const year = date.getFullYear().toString().padStart(4, '0');

  // 月と日を2桁で表示する。
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  // 時間と分を2桁で表示する。
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  // 時間:分 (年/月/日)の形式で文字列を作成する。
  const timestamp = `${hour}:${minute} (${year}/${month}/${day})`;
  return timestamp;
}

export default GetTimeStamp;
