import { ApiProperty } from '@nestjs/swagger';

export class RealShopCreateDto {
  @ApiProperty({
    description: 'Die Url des echten Shops',
  })
  url: string;
}
