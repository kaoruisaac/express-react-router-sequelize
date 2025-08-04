import { Request } from 'express';

export const getPageCriteria = (req: Request | { query: any }): { limit: number, offset: number } => {
  const {  query: { page = 1, perPage = 50 } } = req;
  return { limit: perPage as number, offset: ((page as number) - 1) * (perPage as number) }
}
export const genFixedNumber = (number, digit = 5) => {
  const str = new String(number % (10 ** 4));
  const zeros = (digit - str.length) > 0 ? [...new Array(digit - str.length)].map(() => '0').join('') : '';
  return `${zeros}${number}`;
};