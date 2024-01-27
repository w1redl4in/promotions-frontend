import { TelegramClient, Api } from 'telegram'
import { StringSession } from 'telegram/sessions/index.js'
import input from 'input'

export const bots = [
  'promocasinha',
  'escolhasegura',
  'promosdetudo',
  'promoloucas',
  'promachao',
  'PromocoesGPU',
  'pcdofafapromo',
  'pcbuildwizard',
  'grupodosbets',
  'EconoMister',
  'pcgamerbarato',
  'gpubipolar',
  'gpubipolar_monitores',
]

const apiId = 23056821
const apiHash = 'db05b4762c0bb199cfa00b1bd54d47f2'
const stringSession = new StringSession(
  '1AQAOMTQ5LjE1NC4xNzUuNTEBuyu4y8rvpcoZmB67Mxrorhd+Bj8dZq8WdPlxgTFfj3AwNQnYifYsVHTbdaLAHRI9KlbosurOWlo7+2UukqknjLSNFkgcJDaUbJ6aXaoPQAA5Ki2vX+lVCiHNxgpEKCIoJx/jKf4KMoqHjZWSiPbA+DHZE5Hg6NBFmtaGN4qr+bwl7PeQBlIjRbKczju/2ruL6c+q+DafKsmsSjwFRQ6Q8QO5x4yj7ZP7xuGOqHRTdlAzwAXyWw2WCQOFHhioYGX6Ee5ykWDUzridIHANzB3vrIqqmEVeX737QTu9HCBqy8sWef5cSOA+SRhAliwJfrhmqu2mPeZU44ixp+Fh+BtKM4k=',
)

export async function getTelegramClient() {
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  })

  await client.start({
    phoneNumber: async () => await input.text('number ?'),
    password: async () => await input.text('password?'),
    phoneCode: async () => await input.text('Code ?'),
    onError: (err) => console.log(err),
  })

  return client
}
