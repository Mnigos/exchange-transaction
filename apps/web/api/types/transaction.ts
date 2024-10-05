export interface Transaction {
  exchangeRate: number
  amountInPln: number
  amountInEur: number
  timestamp: Date
}

export type RawTransaction = Omit<Transaction, 'timestamp'> & {
  timestamp: string
}
