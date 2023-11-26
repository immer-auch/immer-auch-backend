import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FakeShopMetadata } from './fake-shop-metadata.entity';
import { Repository } from 'typeorm';
import { FakeShop } from '../fake-shop/fake-shop.entity';
import { FakeShopMetadataUnknownException } from './fake-shop-metadata.exception';
import { FakeShopMetadataDto } from './fake-shop-metadata.dto';
import { WhoIsService } from '../common/whois.service';
import { CertificateService } from '../common/certificate.service';

@Injectable()
export class FakeShopMetadataService {
  constructor(
    @InjectRepository(FakeShopMetadata)
    private readonly repository: Repository<FakeShopMetadata>,
    private readonly whoIsService: WhoIsService,
    private readonly certificateService: CertificateService,
  ) {}

  public async getFakeShopMetadata(
    fakeShopId: number,
  ): Promise<FakeShopMetadataDto> {
    const fakeShopMetadata = await this.repository.findOneBy({
      fakeShop: { id: fakeShopId },
    });
    if (fakeShopMetadata === undefined || fakeShopMetadata === null) {
      throw new FakeShopMetadataUnknownException();
    }
    return {
      id: fakeShopMetadata.id,
      whois: JSON.parse(fakeShopMetadata.whois),
      sslCertificate: JSON.parse(fakeShopMetadata.sslCertificate),
      timeCreated: fakeShopMetadata.timeCreated,
    };
  }

  public async createFakeShopMetadata(
    fakeShop: FakeShop,
  ): Promise<FakeShopMetadata> {
    const domain = fakeShop.domain;
    const whois = await this.whoIsService.getWhoIsInformation(domain);
    //const certificate = await this.certificateService.getCertificate(domain);
    const entity: Partial<FakeShopMetadata> = {
      whois: JSON.stringify(whois),
      sslCertificate: undefined,
      //sslCertificate: JSON.stringify(certificate),
      fakeShop: fakeShop,
    };
    return await this.repository.save(entity);
  }
}
