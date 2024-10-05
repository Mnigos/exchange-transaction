import { type TestingModule, Test } from '@nestjs/testing'

import { ExchangeRateController } from './exchange-rate.controller'
import { ExchangeRateService } from './exchange-rate.service'

describe('ExchangeRateController', () => {
  let moduleRef: TestingModule
  let exchangeRateController: ExchangeRateController
  let exchangeRateService: ExchangeRateService

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [ExchangeRateController],
      providers: [
        ExchangeRateService,
        {
          provide: ExchangeRateService,
          useValue: {
            get: vi.fn(),
          },
        },
      ],
    }).compile()

    exchangeRateController = moduleRef.get(ExchangeRateController)
    exchangeRateService = moduleRef.get(ExchangeRateService)
  })

  afterEach(async () => {
    await moduleRef.close()
  })

  test('should be defined', () => {
    expect(exchangeRateController).toBeDefined()
  })

  describe('get', () => {
    test('should return exchange rate', async () => {
      const exchangeRate = 4.5

      const exchangeRateServiceGetSpy = vi
        .spyOn(exchangeRateService, 'get')
        .mockResolvedValue(exchangeRate)

      expect(await exchangeRateController.get()).toEqual(exchangeRate)

      expect(exchangeRateServiceGetSpy).toHaveBeenCalled()
    })
  })
})
