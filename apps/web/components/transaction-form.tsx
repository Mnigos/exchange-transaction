'use client'

import { Button } from '@repo/ui/components/button'
import { Input } from '@repo/ui/components/input'
import { LoaderCircle } from 'lucide-react'
import { useState, useTransition } from 'react'

import { calculateAmount } from '~/server/actions/calculate-amount'

namespace TransactionForm {
  export type Props = Readonly<{
    amount: number
  }>
}

export function TransactionForm({ amount }: TransactionForm.Props) {
  const [amountInEur, setAmountInEur] = useState(amount)
  const [pending, startTransition] = useTransition()

  function onSubmit(formData: FormData) {
    const amount = formData.get('amount')?.toString()

    if (!amount || Number.isNaN(+amount)) return

    startTransition(async () => {
      await calculateAmount(+amount)
    })
  }

  return (
    <form className="flex w-full max-w-[600px] gap-2" action={onSubmit}>
      <Input
        placeholder="Enter amount"
        value={amountInEur}
        onChange={({ target }) => {
          setAmountInEur(+target.value)
        }}
        name="amount"
      />
      <Button type="submit">
        {pending && <LoaderCircle className="h-4 w-4 animate-spin" />}
        {pending ? 'Calculating...' : 'Calculate'}
      </Button>
    </form>
  )
}
