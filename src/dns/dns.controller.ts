import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FakeShopService } from '../fake-shop/fake-shop.service';

const BLOCKED_DOMAIN_ENTRY =
  'zone "%domain%" {type master; file "blacklist.zone";};';

@ApiTags('DNS')
@Controller('dns')
export class DnsController {
  constructor(private readonly service: FakeShopService) {}

  @Get()
  public async getBlacklistedDomains() {
    const fakeShops = await this.service.getApprovedFakeShops();
    return fakeShops
      .map((fakeShop) => fakeShop.domain)
      .map((domain) => BLOCKED_DOMAIN_ENTRY.replace('%domain%', domain))
      .join('\n');
  }
}
