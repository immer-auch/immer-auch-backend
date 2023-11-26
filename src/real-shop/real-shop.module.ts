import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealShop } from './real-shop.entity';
import { RealShopService } from './real-shop.service';
import { RealShopController } from './real-shop.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([RealShop]), CommonModule],
  providers: [RealShopService],
  controllers: [RealShopController],
})
export class RealShopModule {}
