import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { FakeShopMetadataService } from './fake-shop-metadata.service';

@ApiTags('FakeShopMetadata')
@Controller('fake-shop-metadata')
export class FakeShopMetadataController {
  constructor(private readonly service: FakeShopMetadataService) {}

  @Get('/:fakeShopId')
  public getFakeShopMetadata(@Param('fakeShopId') fakeShopId: number) {
    return this.service.getFakeShopMetadata(fakeShopId);
  }
}
