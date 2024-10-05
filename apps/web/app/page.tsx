import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card'

import type { PageProps } from './types/props'

import { getExchangeRate } from '~/api/fetchers'
import { postTransaction } from '~/api/fetchers/post-transaction'
import { TransactionForm } from '~/components/transaction-form'

export default async function Home({ searchParams: { amount } }: PageProps) {
  const [exchangeRate, transactionResponse] = await Promise.all([
    getExchangeRate(),
    postTransaction(amount ? +amount : 0),
  ])

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="flex w-full max-w-[600px] flex-col gap-8">
        <CardHeader>
          <CardTitle className="text-center text-3xl">
            1 EUR = {exchangeRate} PLN
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-center text-xl font-semibold">
            {transactionResponse.amountInEur} EUR =&nbsp;
            {transactionResponse.amountInPln} PLN
          </p>

          <TransactionForm amount={amount ? +amount : 0} />
        </CardContent>
      </Card>
    </main>
  )
}
