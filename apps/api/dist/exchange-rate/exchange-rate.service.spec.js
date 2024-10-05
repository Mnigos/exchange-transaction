"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _axios = require("@nestjs/axios");
const _rxjs = require("rxjs");
const _cachemanager = require("@nestjs/cache-manager");
const _exchangerateservice = require("./exchange-rate.service");
const _env = require("../config/env");
describe('ExchangeRateService', ()=>{
    let moduleRef;
    let exchangeRateService;
    let httpService;
    let cacheManager;
    beforeEach(async ()=>{
        moduleRef = await _testing.Test.createTestingModule({
            imports: [
                _axios.HttpModule
            ],
            providers: [
                _exchangerateservice.ExchangeRateService,
                {
                    provide: _env.EnvService,
                    useValue: {
                        get: vi.fn().mockReturnValue('')
                    }
                },
                {
                    provide: _cachemanager.CACHE_MANAGER,
                    useValue: {
                        get: vi.fn(),
                        set: vi.fn()
                    }
                }
            ]
        }).compile();
        exchangeRateService = moduleRef.get(_exchangerateservice.ExchangeRateService);
        httpService = moduleRef.get(_axios.HttpService);
        cacheManager = moduleRef.get(_cachemanager.CACHE_MANAGER);
    });
    afterEach(async ()=>{
        await moduleRef.close();
    });
    test('should be defined', ()=>{
        expect(exchangeRateService).toBeDefined();
    });
    describe('get', ()=>{
        const exchangeRate = 4.5;
        let cacheManagerGetSpy;
        let cacheManagerSetSpy;
        let httpGetSpy;
        beforeEach(()=>{
            cacheManagerGetSpy = vi.spyOn(cacheManager, 'get');
            cacheManagerSetSpy = vi.spyOn(cacheManager, 'set');
            httpGetSpy = vi.spyOn(httpService, 'get');
        });
        test('should return not cached exchange rate', async ()=>{
            cacheManagerGetSpy.mockResolvedValue(null);
            httpGetSpy.mockReturnValue((0, _rxjs.of)({
                data: {
                    exchange_rate: exchangeRate
                }
            }));
            expect(await exchangeRateService.get()).toEqual(exchangeRate);
            expect(cacheManagerGetSpy).toHaveBeenCalled();
            expect(httpGetSpy).toHaveBeenCalled();
            expect(cacheManagerSetSpy).toHaveBeenCalledWith('exchange-rate', exchangeRate);
        });
        test('should return cached exchange rate', async ()=>{
            cacheManagerGetSpy.mockResolvedValue(exchangeRate);
            expect(await exchangeRateService.get()).toEqual(exchangeRate);
            expect(cacheManagerGetSpy).toHaveBeenCalled();
            expect(httpGetSpy).not.toHaveBeenCalled();
            expect(cacheManagerSetSpy).not.toHaveBeenCalled();
        });
    });
});

//# sourceMappingURL=exchange-rate.service.spec.js.map