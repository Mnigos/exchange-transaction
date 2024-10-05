import { env } from '~/lib/env'

export async function getExchangeRate() {
  const response = await fetch(`${env.API_URL}/exchange-rate`, {
    next: {
      revalidate: 60,
      tags: ['exchange-rate'],
    },
  })

  return response.json() as Promise<number>
}
