import { ApiProperty } from '@nestjs/swagger';

export class KleinanzeigenCheckDto {
  @ApiProperty({
    description: 'Die Url des Produktes auf Ebay Kleinanzeigen',
  })
  url: string;
}
