import { TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions/index.js'
import input from 'input'
import { env } from './env'

const stringSession = new StringSession(env.NEXT_PUBLIC_STRING_SESSION)

export async function getTelegramClient() {
  const client = new TelegramClient(
    stringSession,
    Number(env.NEXT_PUBLIC_API_ID),
    env.NEXT_PUBLIC_API_HASH,
    {
      connectionRetries: 5,
    },
  )

  await client.start({
    phoneNumber: async () => await input.text('number ?'),
    password: async () => await input.text('password?'),
    phoneCode: async () => await input.text('Code ?'),
    onError: (err) => console.log(err),
  })

  return client
}
