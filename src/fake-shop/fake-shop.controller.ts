import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { FakeShopService } from './fake-shop.service';
import {
  ApproveFakeShopDto,
  DeclineFakeShopDto,
  FakeShopSuspiciousCheckDto,
  ReportFakeShopDto,
} from './fake-shop.dto';
import { FakeShopReportTracingService } from '../fake-shop-report-tracing/fake-shop-report-tracing.service';
import { extractDomain } from '../composables/domain.composable';

@ApiTags('FakeShop')
@Controller('fake-shop')
export class FakeShopController {
  constructor(
    private readonly service: FakeShopService,
    private readonly fakeShopReportTracingService: FakeShopReportTracingService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listet alle existierenden FakeShops auf' })
  public getFakeShops() {
    return this.service.getFakeShops();
  }

  @Get('/approved')
  @ApiOperation({ summary: 'Listet alle akzeptierten FakeShops auf' })
  public getApprovedFakeShops() {
    return this.service.getApprovedFakeShops();
  }

  @Get('/declined')
  @ApiOperation({ summary: 'Listet alle abgelehntent/offenen FakeShops auf' })
  public getDeclinedFakeShops() {
    return this.service.getDeclinedFakeShops();
  }

  @Post()
  @ApiOperation({ summary: 'Meldet einen FakeShop' })
  public reportFakeShop(@Body() dto: ReportFakeShopDto) {
    return this.service.createFakeShop(dto);
  }

  @Patch('/approve')
  @ApiOperation({ summary: 'Akzeptiert einen FakeShop' })
  public approveFakeShop(@Body() dto: ApproveFakeShopDto) {
    return this.service.approveFakeShop(dto);
  }

  @Patch('/decline')
  @ApiOperation({ summary: 'Lehnt einen FakeShop ab' })
  public declineFakeShop(@Body() dto: DeclineFakeShopDto) {
    return this.service.declineFakeShop(dto);
  }

  @Post('/suspicious')
  @ApiOperation({
    summary:
      'Überprüft auf Basis der Meldungen, ob ein Shop fake ist, oder nicht',
  })
  public suspiciousCheck(@Body() dto: FakeShopSuspiciousCheckDto) {
    const domain = extractDomain(dto.url);
    return this.fakeShopReportTracingService.suspiciousCheck(domain);
  }
}
