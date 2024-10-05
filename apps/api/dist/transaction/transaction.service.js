"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TransactionService", {
    enumerable: true,
    get: function() {
        return TransactionService;
    }
});
const _common = require("@nestjs/common");
const _exchangerate = require("../exchange-rate");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TransactionService = class TransactionService {
    constructor(exchangeRateService){
        this.exchangeRateService = exchangeRateService;
    }
    async create(amount) {
        const exchangeRate = await this.exchangeRateService.get();
        console.log(exchangeRate);
        console.log(amount);
        const exchangedAmount = exchangeRate * amount;
        return {
            exchangeRate,
            amountInPln: exchangedAmount,
            amountInEur: amount,
            timestamp: new Date()
        };
    }
};
TransactionService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _exchangerate.ExchangeRateService === "undefined" ? Object : _exchangerate.ExchangeRateService
    ])
], TransactionService);

//# sourceMappingURL=transaction.service.js.map