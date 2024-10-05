import { type TestingModule, Test } from '@nestjs/testing'

import { TransactionService } from './transaction.service'

import { ExchangeRateService } from '~/exchange-rate'

describe('TransactionService', () => {
  let moduleRef: TestingModule
  let transactionService: TransactionService
  let exchangeRateService: ExchangeRateService

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: ExchangeRateService,
          useValue: {
            get: vi.fn(),
          },
        },
      ],
    }).compile()

    transactionService = moduleRef.get(TransactionService)
    exchangeRateService = moduleRef.get(ExchangeRateService)
  })

  afterEach(async () => {
    await moduleRef.close()
  })

  test('should be defined', () => {
    expect(transactionService).toBeDefined()
  })

  describe('create', () => {
    test('should return exchange rate', async () => {
      const exchangeRate = 4.5

      const exchangeRateServiceGetSpy = vi
        .spyOn(exchangeRateService, 'get')
        .mockResolvedValue(exchangeRate)

      expect(await transactionService.create(100)).toEqual({
        exchangeRate,
        amountInPln: 450,
        amountInEur: 100,
        timestamp: expect.any(Date),
      })

      expect(exchangeRateServiceGetSpy).toHaveBeenCalled()
    })
  })
})
