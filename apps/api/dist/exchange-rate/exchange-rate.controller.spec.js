"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _exchangeratecontroller = require("./exchange-rate.controller");
const _exchangerateservice = require("./exchange-rate.service");
describe('ExchangeRateController', ()=>{
    let moduleRef;
    let exchangeRateController;
    let exchangeRateService;
    beforeEach(async ()=>{
        moduleRef = await _testing.Test.createTestingModule({
            controllers: [
                _exchangeratecontroller.ExchangeRateController
            ],
            providers: [
                _exchangerateservice.ExchangeRateService,
                {
                    provide: _exchangerateservice.ExchangeRateService,
                    useValue: {
                        get: vi.fn()
                    }
                }
            ]
        }).compile();
        exchangeRateController = moduleRef.get(_exchangeratecontroller.ExchangeRateController);
        exchangeRateService = moduleRef.get(_exchangerateservice.ExchangeRateService);
    });
    afterEach(async ()=>{
        await moduleRef.close();
    });
    test('should be defined', ()=>{
        expect(exchangeRateController).toBeDefined();
    });
    describe('get', ()=>{
        test('should return exchange rate', async ()=>{
            const exchangeRate = 4.5;
            const exchangeRateServiceGetSpy = vi.spyOn(exchangeRateService, 'get').mockResolvedValue(exchangeRate);
            expect(await exchangeRateController.get()).toEqual(exchangeRate);
            expect(exchangeRateServiceGetSpy).toHaveBeenCalled();
        });
    });
});

//# sourceMappingURL=exchange-rate.controller.spec.js.map