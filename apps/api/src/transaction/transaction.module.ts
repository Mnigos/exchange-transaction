import { Module } from '@nestjs/common'

import { TransactionService } from './transaction.service'
import { TransactionController } from './transaction.controller'

import { ExchangeRateModule } from '~/exchange-rate'

@Module({
  imports: [ExchangeRateModule],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
