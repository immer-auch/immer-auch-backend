import { HttpException, HttpStatus } from '@nestjs/common';

const domainRegExp = /https?:\/\/(?:www\.)?([a-zA-Z0-9.-]+)/;

export class InvalidUrlException extends HttpException {
  constructor() {
    super('Given input is not a valid url', HttpStatus.BAD_REQUEST);
  }
}

export function extractDomain(input: string): string | undefined {
  if (!domainRegExp.test(input)) {
    throw new InvalidUrlException();
  }
  const match = input.match(domainRegExp);
  return match ? match[1] : null;
}
