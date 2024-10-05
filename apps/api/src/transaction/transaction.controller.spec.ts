import { type TestingModule, Test } from '@nestjs/testing'

import { TransactionController } from './transaction.controller'
import { TransactionService } from './transaction.service'

describe('TransactionController', () => {
  let moduleRef: TestingModule
  let transactionController: TransactionController
  let transactionService: TransactionService

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        TransactionService,
        {
          provide: TransactionService,
          useValue: {
            create: vi.fn(),
          },
        },
      ],
    }).compile()

    transactionController = moduleRef.get(TransactionController)
    transactionService = moduleRef.get(TransactionService)
  })

  afterEach(async () => {
    await moduleRef.close()
  })

  test('should be defined', () => {
    expect(transactionController).toBeDefined()
  })

  describe('create', () => {
    test('should return exchange rate', async () => {
      const exchangeRate = 4.5

      const transactionServiceCreateSpy = vi
        .spyOn(transactionService, 'create')
        .mockResolvedValue({
          exchangeRate,
          amountInPln: 450,
          amountInEur: 100,
          timestamp: new Date(),
        })

      expect(await transactionController.create(100)).toEqual({
        exchangeRate,
        amountInPln: 450,
        amountInEur: 100,
        timestamp: expect.any(Date),
      })

      expect(transactionServiceCreateSpy).toHaveBeenCalled()
    })
  })
})
