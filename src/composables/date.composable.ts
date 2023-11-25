export class DateSubtract {
  seconds?: number = 0;
  minutes?: number = 0;
  hours?: number = 0;
  days?: number = 0;
  weeks?: number = 0;
  months?: number = 0;
  years?: number = 0;
}

export function now(): Date {
  return new Date();
}

export function dateSubtract(
  base: Date,
  { seconds, minutes, hours, days, weeks, months, years }: DateSubtract,
): Date {
  const result = new Date(base);
  result.setSeconds(base.getSeconds() - (seconds ?? 0));
  result.setMinutes(base.getMinutes() - (minutes ?? 0));
  result.setHours(base.getHours() - (hours ?? 0));
  result.setDate(base.getDate() - (days ?? 0) - weeks * 7);
  result.setMonth(base.getMonth() - months);
  result.setFullYear(base.getFullYear() - years);
  return result;
}
