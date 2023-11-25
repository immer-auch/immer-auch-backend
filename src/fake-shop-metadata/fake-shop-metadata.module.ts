import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FakeShopMetadata } from './fake-shop-metadata.entity';
import { FakeShopMetadataService } from './fake-shop-metadata.service';
import { FakeShopMetadataController } from './fake-shop-metadata.controller';
import { FakeShopModule } from '../fake-shop/fake-shop.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FakeShopMetadata]),
    forwardRef(() => FakeShopModule),
    CommonModule,
  ],
  providers: [FakeShopMetadataService],
  exports: [FakeShopMetadataService],
  controllers: [FakeShopMetadataController],
})
export class FakeShopMetadataModule {}
