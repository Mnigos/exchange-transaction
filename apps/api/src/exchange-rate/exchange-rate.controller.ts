import { Controller, Get } from '@nestjs/common'

import { ExchangeRateService } from './exchange-rate.service'

@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Get()
  get() {
    return this.exchangeRateService.get()
  }
}
