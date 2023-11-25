import { ApiProperty } from '@nestjs/swagger';
import { FakeShopSource } from './fake-shop.entity';

export class ReportFakeShopDto {
  @ApiProperty({
    type: String,
    description: 'Die URL des FakeShops',
  })
  url: string;

  @ApiProperty({
    enum: FakeShopSource,
    isArray: true,
    example: [
      FakeShopSource.Unknown,
      FakeShopSource.Crawler,
      FakeShopSource.Extension,
      FakeShopSource.Website,
    ],
  })
  source: FakeShopSource;
}

export class ApproveFakeShopDto {
  @ApiProperty({
    type: Number,
    description: 'Die Id des FakeShops',
  })
  fakeShopId: number;
}

export class DeclineFakeShopDto {
  @ApiProperty({
    type: Number,
    description: 'Die Id des FakeShops',
  })
  fakeShopId: number;
}

export class FakeShopSuspiciousCheckDto {
  @ApiProperty({
    type: String,
    description: 'Die URL des FakeShops',
  })
  url: string;
}
