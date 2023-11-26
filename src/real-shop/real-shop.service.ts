import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RealShop } from './real-shop.entity';
import { Equal, Repository } from 'typeorm';
import { WhoIsService } from '../common/whois.service';
import { Transactional } from 'typeorm-transactional';
import { extractDomain } from '../composables/domain.composable';

@Injectable()
export class RealShopService {
  constructor(
    @InjectRepository(RealShop)
    private readonly repository: Repository<RealShop>,
    private readonly whoIsService: WhoIsService,
  ) {}

  public getRealShops(): Promise<RealShop[]> {
    return this.repository.find();
  }

  @Transactional()
  public async createRealShop(url: string): Promise<RealShop> {
    const domain = extractDomain(url);
    const exists = await this.repository.exist({
      where: { domain: Equal(domain) },
    });
    if (exists) {
      return await this.repository.findOneBy({ domain: Equal(domain) });
    }
    const whois = await this.whoIsService.getWhoIsInformation(domain);
    return await this.repository.save({
      domain: domain,
      whois: JSON.stringify(whois),
    });
  }
}
