"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _transactioncontroller = require("./transaction.controller");
const _transactionservice = require("./transaction.service");
describe('TransactionController', ()=>{
    let moduleRef;
    let transactionController;
    let transactionService;
    beforeEach(async ()=>{
        moduleRef = await _testing.Test.createTestingModule({
            controllers: [
                _transactioncontroller.TransactionController
            ],
            providers: [
                _transactionservice.TransactionService,
                {
                    provide: _transactionservice.TransactionService,
                    useValue: {
                        create: vi.fn()
                    }
                }
            ]
        }).compile();
        transactionController = moduleRef.get(_transactioncontroller.TransactionController);
        transactionService = moduleRef.get(_transactionservice.TransactionService);
    });
    afterEach(async ()=>{
        await moduleRef.close();
    });
    test('should be defined', ()=>{
        expect(transactionController).toBeDefined();
    });
    describe('create', ()=>{
        test('should return exchange rate', async ()=>{
            const exchangeRate = 4.5;
            const transactionServiceCreateSpy = vi.spyOn(transactionService, 'create').mockResolvedValue({
                exchangeRate,
                amountInPln: 450,
                amountInEur: 100,
                timestamp: new Date()
            });
            expect(await transactionController.create(100)).toEqual({
                exchangeRate,
                amountInPln: 450,
                amountInEur: 100,
                timestamp: expect.any(Date)
            });
            expect(transactionServiceCreateSpy).toHaveBeenCalled();
        });
    });
});

//# sourceMappingURL=transaction.controller.spec.js.map