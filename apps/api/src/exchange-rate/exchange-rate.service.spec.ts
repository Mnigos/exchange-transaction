import { Test, type TestingModule } from '@nestjs/testing'
import { HttpModule, HttpService } from '@nestjs/axios'
import type { AxiosResponse } from 'axios'
import { of } from 'rxjs'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import type { Cache } from 'cache-manager'
import type { MockInstance } from 'vitest'

import { ExchangeRateService } from './exchange-rate.service'

import { EnvService } from '~/config/env'

describe('ExchangeRateService', () => {
  let moduleRef: TestingModule
  let exchangeRateService: ExchangeRateService
  let httpService: HttpService
  let cacheManager: Cache

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ExchangeRateService,
        {
          provide: EnvService,
          useValue: {
            get: vi.fn().mockReturnValue(''),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: vi.fn(),
            set: vi.fn(),
          },
        },
      ],
    }).compile()

    exchangeRateService = moduleRef.get(ExchangeRateService)
    httpService = moduleRef.get(HttpService)
    cacheManager = moduleRef.get(CACHE_MANAGER)
  })

  afterEach(async () => {
    await moduleRef.close()
  })

  test('should be defined', () => {
    expect(exchangeRateService).toBeDefined()
  })

  describe('get', () => {
    const exchangeRate = 4.5

    let cacheManagerGetSpy: MockInstance<Cache['get']>
    let cacheManagerSetSpy: MockInstance<Cache['set']>
    let httpGetSpy: MockInstance<HttpService['get']>

    beforeEach(() => {
      cacheManagerGetSpy = vi.spyOn(cacheManager, 'get')
      cacheManagerSetSpy = vi.spyOn(cacheManager, 'set')
      httpGetSpy = vi.spyOn(httpService, 'get')
    })

    test('should return not cached exchange rate', async () => {
      cacheManagerGetSpy.mockResolvedValue(null)
      httpGetSpy.mockReturnValue(
        of({
          data: {
            exchange_rate: exchangeRate,
          },
        } as AxiosResponse)
      )

      expect(await exchangeRateService.get()).toEqual(exchangeRate)

      expect(cacheManagerGetSpy).toHaveBeenCalled()
      expect(httpGetSpy).toHaveBeenCalled()
      expect(cacheManagerSetSpy).toHaveBeenCalledWith(
        'exchange-rate',
        exchangeRate
      )
    })

    test('should return cached exchange rate', async () => {
      cacheManagerGetSpy.mockResolvedValue(exchangeRate)

      expect(await exchangeRateService.get()).toEqual(exchangeRate)

      expect(cacheManagerGetSpy).toHaveBeenCalled()
      expect(httpGetSpy).not.toHaveBeenCalled()
      expect(cacheManagerSetSpy).not.toHaveBeenCalled()
    })
  })
})
