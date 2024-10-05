'use server'

import { redirect } from 'next/navigation'

export async function calculateAmount(amount: number) {
  if (!amount) return

  redirect(`/?amount=${amount}`)
}
