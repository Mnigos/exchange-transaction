"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ExchangeRateService", {
    enumerable: true,
    get: function() {
        return ExchangeRateService;
    }
});
const _axios = require("@nestjs/axios");
const _cachemanager = require("@nestjs/cache-manager");
const _common = require("@nestjs/common");
const _rxjs = require("rxjs");
const _env = require("../config/env");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let ExchangeRateService = class ExchangeRateService {
    constructor(httpService, envService, cacheManager){
        this.httpService = httpService;
        this.envService = envService;
        this.cacheManager = cacheManager;
    }
    async get() {
        const cachedExchangeRate = await this.cacheManager.get('exchange-rate');
        if (cachedExchangeRate) return cachedExchangeRate;
        const { data } = await (0, _rxjs.firstValueFrom)(this.httpService.get(this.envService.get('API_URL'), {
            headers: {
                'x-api-key': this.envService.get('API_KEY')
            }
        }));
        const exchangeRate = data.exchange_rate;
        await this.cacheManager.set('exchange-rate', exchangeRate);
        return exchangeRate;
    }
};
ExchangeRateService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _common.Inject)(_cachemanager.CACHE_MANAGER)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _axios.HttpService === "undefined" ? Object : _axios.HttpService,
        typeof _env.EnvService === "undefined" ? Object : _env.EnvService,
        typeof Cache === "undefined" ? Object : Cache
    ])
], ExchangeRateService);

//# sourceMappingURL=exchange-rate.service.js.map