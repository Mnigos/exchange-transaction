import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common'

import { TransactionService } from './transaction.service'

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body('amount', ParseIntPipe) amount: number) {
    return this.transactionService.create(amount)
  }
}
