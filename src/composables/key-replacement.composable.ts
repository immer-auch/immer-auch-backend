import { camelCase } from 'typeorm/util/StringUtils';

export function transformCamelCaseKeys(obj: any): any {
  const base = {};
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (typeof value === 'object' && !Array.isArray(value)) {
      base[camelCase(key, false)] = transformCamelCaseKeys(value);
    } else {
      base[camelCase(key, false)] = value;
    }
  });
  return base;
}
