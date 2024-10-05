"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ExchangeRateModule", {
    enumerable: true,
    get: function() {
        return ExchangeRateModule;
    }
});
const _axios = require("@nestjs/axios");
const _common = require("@nestjs/common");
const _cachemanager = require("@nestjs/cache-manager");
const _exchangerateservice = require("./exchange-rate.service");
const _exchangeratecontroller = require("./exchange-rate.controller");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ExchangeRateModule = class ExchangeRateModule {
};
ExchangeRateModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _axios.HttpModule,
            _cachemanager.CacheModule.register({
                ttl: 60 * 1000
            })
        ],
        providers: [
            _exchangerateservice.ExchangeRateService
        ],
        exports: [
            _exchangerateservice.ExchangeRateService
        ],
        controllers: [
            _exchangeratecontroller.ExchangeRateController
        ]
    })
], ExchangeRateModule);

//# sourceMappingURL=exchange-rate.module.js.map