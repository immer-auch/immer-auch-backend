import { ApiProperty } from '@nestjs/swagger';

export class ReportFakeShopDto {
  @ApiProperty({
    type: String,
    description: 'Die URL des FakeShops',
  })
  url: string;
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
