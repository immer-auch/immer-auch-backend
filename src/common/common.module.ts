import { Module } from '@nestjs/common';
import { WhoIsService } from './whois.service';
import { CertificateService } from './certificate.service';

@Module({
  providers: [WhoIsService, CertificateService],
  exports: [WhoIsService, CertificateService],
})
export class CommonModule {}
