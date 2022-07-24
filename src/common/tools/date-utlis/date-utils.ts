import * as moment from 'moment';

export const stringifyDate = (date: Date | string, format?: string): string => {
  const stringifiedDate = moment(date);
  if (format) stringifiedDate.format(format);
  return stringifiedDate.toString();
};

export const isSameDate = (
  firstDate: Date | string,
  secondDate: Date | string,
  format?: string,
): boolean => {
  return stringifyDate(firstDate, format) === stringifyDate(secondDate, format);
};
