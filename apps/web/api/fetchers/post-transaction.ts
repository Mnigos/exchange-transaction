import type { RawTransaction, Transaction } from '../types'

import { env } from '~/lib/env'

export async function postTransaction(amount: number) {
  console.log(amount)

  const response = await fetch(`${env.API_URL}/transaction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  })

  const parsedResponse = (await response.json()) as RawTransaction

  return {
    ...parsedResponse,
    timestamp: new Date(parsedResponse.timestamp),
  } as Transaction
}
