import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_BOTS_TELEGRAM: z.string(),
  NEXT_PUBLIC_API_ID: z.string(),
  NEXT_PUBLIC_API_HASH: z.string(),
  NEXT_PUBLIC_STRING_SESSION: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error('Invalid env variables', parsedEnv.error.flatten().fieldErrors)

  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data
