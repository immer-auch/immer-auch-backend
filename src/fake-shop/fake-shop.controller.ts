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
  @ApiOperation({ summary: 'GetFakeShops' })
  public getFakeShops() {
    return this.service.getFakeShops();
  }

  @Get('/approved')
  @ApiOperation({ summary: 'GetApprovedFakeShops' })
  public getApprovedFakeShops() {
    return this.service.getApprovedFakeShops();
  }

  @Get('/declined')
  @ApiOperation({ summary: 'GetDeclinedFakeShops' })
  public getDeclinedFakeShops() {
    return this.service.getDeclinedFakeShops();
  }

  @Post()
  @ApiOperation({ summary: 'ReportFakeShop' })
  public reportFakeShop(@Body() dto: ReportFakeShopDto) {
    return this.service.createFakeShop(dto);
  }

  @Patch('/approve')
  @ApiOperation({ summary: 'ApproveFakeShop' })
  public approveFakeShop(@Body() dto: ApproveFakeShopDto) {
    return this.service.approveFakeShop(dto);
  }

  @Patch('/decline')
  @ApiOperation({ summary: 'DeclineFakeShop' })
  public declineFakeShop(@Body() dto: DeclineFakeShopDto) {
    return this.service.declineFakeShop(dto);
  }

  @Post('/suspicious')
  @ApiOperation({ summary: 'FakeShopSuspiciousCheck' })
  public suspiciousCheck(@Body() dto: FakeShopSuspiciousCheckDto) {
    const domain = extractDomain(dto.url);
    return this.fakeShopReportTracingService.suspiciousCheck(domain);
  }
}
