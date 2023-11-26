import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { FakeShopModule } from './fake-shop/fake-shop.module';
import { ConfigModule } from '@nestjs/config';
import { FakeShopMetadataModule } from './fake-shop-metadata/fake-shop-metadata.module';
import { CommonModule } from './common/common.module';
import { FakeShopReportTracingModule } from './fake-shop-report-tracing/fake-shop-report-tracing.module';
import { KleinanzeigenModule } from './kleinanzeigen/kleinanzeigen.module';
import { DnsModule } from './dns/dns.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    CommonModule,
    DatabaseModule,
    FakeShopModule,
    FakeShopMetadataModule,
    FakeShopReportTracingModule,
    KleinanzeigenModule,
    DnsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
