import { Body, Controller, Get, Post } from '@nestjs/common';
import { RealShopService } from './real-shop.service';
import { RealShopCreateDto } from './real-shop.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Echte Shops')
@Controller('real-shop')
export class RealShopController {
  constructor(private readonly service: RealShopService) {}

  @Get()
  @ApiOperation({ summary: 'Gibt alle echten Shops zurück' })
  public getRealShops() {
    return this.service.getRealShops();
  }

  @Post()
  @ApiOperation({ summary: 'Legt einen echten Shop an' })
  public createRealShop(@Body() dto: RealShopCreateDto) {
    return this.service.createRealShop(dto.url);
  }
}
