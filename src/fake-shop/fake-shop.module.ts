import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FakeShop } from './fake-shop.entity';
import { FakeShopController } from './fake-shop.controller';
import { FakeShopService } from './fake-shop.service';
import { FakeShopMetadataModule } from '../fake-shop-metadata/fake-shop-metadata.module';
import { FakeShopReportTracingModule } from '../fake-shop-report-tracing/fake-shop-report-tracing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FakeShop]),
    forwardRef(() => FakeShopMetadataModule),
    forwardRef(() => FakeShopReportTracingModule),
  ],
  controllers: [FakeShopController],
  providers: [FakeShopService],
  exports: [FakeShopService],
})
export class FakeShopModule {}
