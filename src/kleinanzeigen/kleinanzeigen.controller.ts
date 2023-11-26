import { Body, Controller, Post } from '@nestjs/common';
import { KleinanzeigenService } from './kleinanzeigen.service';
import { KleinanzeigenCheckDto } from './kleinanzeigen.dto';

@Controller('kleinanzeigen')
export class KleinanzeigenController {
  constructor(private readonly service: KleinanzeigenService) {}

  @Post()
  public getKleinanzeigenUserId(@Body() dto: KleinanzeigenCheckDto) {
    return this.service.getUserInformationByProductUrl(dto.url);
  }
}
