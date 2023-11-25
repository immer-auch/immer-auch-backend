import { HttpException, HttpStatus } from '@nestjs/common';

export class FakeShopMetadataUnknownException extends HttpException {
  constructor() {
    super('No Metadata found for FakeShop', HttpStatus.NOT_FOUND);
  }
}
