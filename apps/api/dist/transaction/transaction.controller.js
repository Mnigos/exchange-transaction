"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TransactionController", {
    enumerable: true,
    get: function() {
        return TransactionController;
    }
});
const _common = require("@nestjs/common");
const _transactionservice = require("./transaction.service");
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
let TransactionController = class TransactionController {
    constructor(transactionService){
        this.transactionService = transactionService;
    }
    create(amount) {
        return this.transactionService.create(amount);
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)('amount', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", void 0)
], TransactionController.prototype, "create", null);
TransactionController = _ts_decorate([
    (0, _common.Controller)('transaction'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _transactionservice.TransactionService === "undefined" ? Object : _transactionservice.TransactionService
    ])
], TransactionController);

//# sourceMappingURL=transaction.controller.js.map