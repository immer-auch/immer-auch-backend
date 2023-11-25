import { ApiProperty } from '@nestjs/swagger';

export class ReportFakeShopDto {
  @ApiProperty({
    type: String,
    description: 'Address of the FakeShop which should be reported',
  })
  url: string;
}

export class ApproveFakeShopDto {
  @ApiProperty({
    type: Number,
    description: 'The Id of the FakeShop which should be marked as approved',
  })
  fakeShopId: number;
}

export class DeclineFakeShopDto {
  @ApiProperty({
    type: Number,
    description: 'The Id of the FakeShop which should be marked as declined',
  })
  fakeShopId: number;
}

export class FakeShopSuspiciousCheckDto {
  @ApiProperty({
    type: String,
    description: 'Address of the FakeShop which should be checked',
  })
  url: string;
}
