import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { EnvModule, envSchema } from '~/config/env'
import { ExchangeRateModule } from '~/exchange-rate'
import { TransactionModule } from '~/transaction'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    ExchangeRateModule,
    TransactionModule,
  ],
})
export class AppModule {}
