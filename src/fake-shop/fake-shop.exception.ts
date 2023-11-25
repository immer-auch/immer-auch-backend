import { HttpException, HttpStatus } from '@nestjs/common';

export class FakeShopUnknownException extends HttpException {
  constructor() {
    super('FakeShop is unknown', HttpStatus.NOT_FOUND);
  }
}

export class FakeShopAlreadyApproved extends HttpException {
  constructor() {
    super('FakeShop is already approved', HttpStatus.CONFLICT);
  }
}

export class FakeShopAlreadyDeclined extends HttpException {
  constructor() {
    super('FakeShop is already declined', HttpStatus.CONFLICT);
  }
}
