"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TransactionModule", {
    enumerable: true,
    get: function() {
        return TransactionModule;
    }
});
const _common = require("@nestjs/common");
const _transactionservice = require("./transaction.service");
const _transactioncontroller = require("./transaction.controller");
const _exchangerate = require("../exchange-rate");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let TransactionModule = class TransactionModule {
};
TransactionModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _exchangerate.ExchangeRateModule
        ],
        providers: [
            _transactionservice.TransactionService
        ],
        controllers: [
            _transactioncontroller.TransactionController
        ]
    })
], TransactionModule);

//# sourceMappingURL=transaction.module.js.map