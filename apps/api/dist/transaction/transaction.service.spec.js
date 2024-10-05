"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _transactionservice = require("./transaction.service");
const _exchangerate = require("../exchange-rate");
describe('TransactionService', ()=>{
    let moduleRef;
    let transactionService;
    let exchangeRateService;
    beforeEach(async ()=>{
        moduleRef = await _testing.Test.createTestingModule({
            providers: [
                _transactionservice.TransactionService,
                {
                    provide: _exchangerate.ExchangeRateService,
                    useValue: {
                        get: vi.fn()
                    }
                }
            ]
        }).compile();
        transactionService = moduleRef.get(_transactionservice.TransactionService);
        exchangeRateService = moduleRef.get(_exchangerate.ExchangeRateService);
    });
    afterEach(async ()=>{
        await moduleRef.close();
    });
    test('should be defined', ()=>{
        expect(transactionService).toBeDefined();
    });
    describe('create', ()=>{
        test('should return exchange rate', async ()=>{
            const exchangeRate = 4.5;
            const exchangeRateServiceGetSpy = vi.spyOn(exchangeRateService, 'get').mockResolvedValue(exchangeRate);
            expect(await transactionService.create(100)).toEqual({
                exchangeRate,
                amountInPln: 450,
                amountInEur: 100,
                timestamp: expect.any(Date)
            });
            expect(exchangeRateServiceGetSpy).toHaveBeenCalled();
        });
    });
});

//# sourceMappingURL=transaction.service.spec.js.map