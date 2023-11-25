import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FakeShopReportTracing } from './fake-shop-report-tracing.entity';
import { FakeShopReportTracingService } from './fake-shop-report-tracing.service';

@Module({
  imports: [TypeOrmModule.forFeature([FakeShopReportTracing])],
  providers: [FakeShopReportTracingService],
  exports: [FakeShopReportTracingService],
})
export class FakeShopReportTracingModule {}
