import { Body, Controller, Post } from '@nestjs/common';
import { KleinanzeigenService } from './kleinanzeigen.service';
import { KleinanzeigenCheckDto } from './kleinanzeigen.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Ebay Kleinanzeigen')
@Controller('kleinanzeigen')
export class KleinanzeigenController {
  constructor(private readonly service: KleinanzeigenService) {}

  @Post()
  @ApiOperation({
    summary: 'Sucht nach einem Kleinanzeigen Nutzer auf Basis der Produkt Url',
  })
  public getKleinanzeigenUserId(@Body() dto: KleinanzeigenCheckDto) {
    return this.service.getUserInformationByProductUrl(dto.url);
  }

  @Post('/suspicious')
  @ApiOperation({
    summary: 'Entscheidet ob der Verkäufer eines Produktes suspicious ist',
  })
  public suspiciousKleinanzeigenUserCheck(
    @Body() dto: KleinanzeigenCheckDto,
  ): Promise<boolean> {
    return this.service.isSuspiciousKleinanzeigenUser(dto.url);
  }
}
