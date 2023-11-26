import { Module } from '@nestjs/common';
import { FakeShopModule } from '../fake-shop/fake-shop.module';
import { DnsController } from './dns.controller';

@Module({
  imports: [FakeShopModule],
  controllers: [DnsController],
})
export class DnsModule {}
