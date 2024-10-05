import { HttpService } from '@nestjs/axios'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import type { Cache } from 'cache-manager'

import { EnvService } from '~/config/env'

@Injectable()
export class ExchangeRateService {
  constructor(
    private readonly httpService: HttpService,
    private readonly envService: EnvService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  async get() {
    const cachedExchangeRate =
      await this.cacheManager.get<number>('exchange-rate')

    if (cachedExchangeRate) return cachedExchangeRate

    const { data } = await firstValueFrom(
      this.httpService.get<{ exchange_rate: number }>(
        this.envService.get('API_URL'),
        {
          headers: {
            'x-api-key': this.envService.get('API_KEY'),
          },
        }
      )
    )

    const exchangeRate = data.exchange_rate

    await this.cacheManager.set('exchange-rate', exchangeRate)

    return exchangeRate
  }
}
