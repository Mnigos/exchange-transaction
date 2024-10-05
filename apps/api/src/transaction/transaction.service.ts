import { Injectable } from '@nestjs/common'

import { ExchangeRateService } from '~/exchange-rate'

@Injectable()
export class TransactionService {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  async create(amount: number) {
    const exchangeRate = await this.exchangeRateService.get()

    console.log(exchangeRate)
    console.log(amount)

    const exchangedAmount = exchangeRate * amount

    return {
      exchangeRate,
      amountInPln: exchangedAmount,
      amountInEur: amount,
      timestamp: new Date(),
    }
  }
}
