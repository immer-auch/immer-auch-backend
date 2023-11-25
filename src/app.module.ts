import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { FakeShopModule } from './fake-shop/fake-shop.module';
import { ConfigModule } from '@nestjs/config';
import { FakeShopMetadataModule } from './fake-shop-metadata/fake-shop-metadata.module';
import { CommonModule } from './common/common.module';
import { FakeShopReportTracingModule } from './fake-shop-report-tracing/fake-shop-report-tracing.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
