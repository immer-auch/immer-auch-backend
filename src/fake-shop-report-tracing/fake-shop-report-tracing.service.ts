import { InjectRepository } from '@nestjs/typeorm';
import { FakeShopReportTracing } from './fake-shop-report-tracing.entity';
import { Between, Equal, Repository } from 'typeorm';
import { FakeShop } from '../fake-shop/fake-shop.entity';
import { Injectable } from '@nestjs/common';
import { FakeShopSuspiciousCheckResult } from './fake-shop-report-tracing.dto';
import { DateTime } from 'luxon';

const REPORT_COUNT_FAKE_SHOP_IS_SUSPICIOUS: number = 10;

@Injectable()
export class FakeShopReportTracingService {
  constructor(
    @InjectRepository(FakeShopReportTracing)
    private readonly repository: Repository<FakeShopReportTracing>,
  ) {}

  public async traceFakeShopReport(
    fakeShop: FakeShop,
    reporterId: string,
  ): Promise<FakeShopReportTracing> {
    const entity = await this.repository.save({
      fakeShop: fakeShop,
      reporterId: reporterId,
    });
    return await this.repository.save(entity);
  }

  public async suspiciousCheck(
    domain: string,
  ): Promise<FakeShopSuspiciousCheckResult> {
    const where = { fakeShop: { domain: Equal(domain) } };
    const exists = await this.repository.exist({
      where: where,
    });
    if (!exists) {
      return {
        suspicious: false,
        totalCount: 0,
        timeLastReport: null,
        timeFirstReport: null,
      };
    }
    const count = await this.repository.countBy({
      fakeShop: {
        domain: Equal(domain),
      },
      timeCreated: Between(
        DateTime.now().minus({ hour: 24 }).toJSDate(),
        DateTime.now().toJSDate(),
      ),
    });
    const reports = await this.repository.find({
      where: where,
      order: { timeCreated: 'ASC' },
    });
    return {
      suspicious: count >= REPORT_COUNT_FAKE_SHOP_IS_SUSPICIOUS,
      totalCount: count,
      timeLastReport: reports[reports.length - 1].timeCreated,
      timeFirstReport: reports[0].timeCreated,
    };
  }
}
