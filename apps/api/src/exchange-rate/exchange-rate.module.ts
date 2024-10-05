import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'

import { ExchangeRateService } from './exchange-rate.service'
import { ExchangeRateController } from './exchange-rate.controller'

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 60 * 1000,
    }),
  ],
  providers: [ExchangeRateService],
  exports: [ExchangeRateService],
  controllers: [ExchangeRateController],
})
export class ExchangeRateModule {}
