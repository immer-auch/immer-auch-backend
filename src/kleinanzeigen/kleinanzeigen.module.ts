import { Module } from '@nestjs/common';
import { KleinanzeigenService } from './kleinanzeigen.service';
import { KleinanzeigenController } from './kleinanzeigen.controller';

@Module({
  controllers: [KleinanzeigenController],
  providers: [KleinanzeigenService],
  exports: [KleinanzeigenService],
})
export class KleinanzeigenModule {}
