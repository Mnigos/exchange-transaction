import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(4000),
  API_URL: z.string().url(),
  API_KEY: z.string().min(1),
})

export type Env = z.infer<typeof envSchema>
