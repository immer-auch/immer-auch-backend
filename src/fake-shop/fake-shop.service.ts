import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FakeShop } from './fake-shop.entity';
import { Equal, FindOptionsWhere, Repository } from 'typeorm';
import {
  ApproveFakeShopDto,
  DeclineFakeShopDto,
  ReportFakeShopDto,
} from './fake-shop.dto';
import { Transactional } from 'typeorm-transactional';
import {
  FakeShopAlreadyApproved,
  FakeShopAlreadyDeclined,
  FakeShopUnknownException,
} from './fake-shop.exception';
import { FakeShopMetadataService } from '../fake-shop-metadata/fake-shop-metadata.service';
import { extractDomain } from '../composables/domain.composable';
import { FakeShopReportTracingService } from '../fake-shop-report-tracing/fake-shop-report-tracing.service';

@Injectable()
export class FakeShopService {
  constructor(
    @InjectRepository(FakeShop)
    private readonly repository: Repository<FakeShop>,
    @Inject(forwardRef(() => FakeShopMetadataService))
    private readonly fakeShopMetadataService: FakeShopMetadataService,
    @Inject(forwardRef(() => FakeShopReportTracingService))
    private readonly fakeShopReportTracingService: FakeShopReportTracingService,
  ) {}

  public getFakeShops(): Promise<Array<FakeShop>> {
    return this.repository.find();
  }

  public getApprovedFakeShops(): Promise<Array<FakeShop>> {
    return this.repository.findBy({ approved: Equal(true) });
  }

  public getDeclinedFakeShops(): Promise<Array<FakeShop>> {
    return this.repository.findBy({ approved: Equal(false) });
  }

  public async getFakeShop(id: number): Promise<FakeShop> {
    const entity = await this.repository.findOneBy({ id: Equal(id) });
    if (entity === undefined || entity === null) {
      throw new FakeShopUnknownException();
    }
    return entity;
  }

  @Transactional()
  public async createFakeShop(dto: ReportFakeShopDto): Promise<FakeShop> {
    // ReporterId, which should be fetched from request headers
    const reporterId: string = '00000000-0000-0000-0003-000000000001';
    // Transform url into domain address "https://www.adidas.de" => "adidas.de"
    const domain = extractDomain(dto.url);
    const where: FindOptionsWhere<FakeShop> = {
      domain: Equal(domain),
    };
    const exists = await this.repository.exist({ where: where });
    if (exists) {
      await this.repository.increment(where, 'reportCount', 1);
      const fakeShop = await this.repository.findOneBy(where);
      await this.fakeShopReportTracingService.traceFakeShopReport(
        fakeShop,
        reporterId,
      );
      return fakeShop;
    }
    const fakeShop = await this.repository.save({
      domain: domain,
      reportCount: 1,
    });
    await this.fakeShopMetadataService.createFakeShopMetadata(fakeShop);
    await this.fakeShopReportTracingService.traceFakeShopReport(
      fakeShop,
      reporterId,
    );
    return fakeShop;
  }

  @Transactional()
  public async approveFakeShop(dto: ApproveFakeShopDto): Promise<FakeShop> {
    const entity = await this.getFakeShop(dto.fakeShopId);
    if (entity.approved) {
      throw new FakeShopAlreadyApproved();
    }
    entity.approved = true;
    return await this.repository.save(entity);
  }

  @Transactional()
  public async declineFakeShop(dto: DeclineFakeShopDto): Promise<FakeShop> {
    const entity = await this.getFakeShop(dto.fakeShopId);
    if (!entity.approved) {
      throw new FakeShopAlreadyDeclined();
    }
    entity.approved = false;
    return await this.repository.save(entity);
  }
}
