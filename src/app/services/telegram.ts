import { Api, TelegramClient } from 'telegram'
import moment from 'moment'

export async function findPromotions({
  q,
  bot,
  telegramClient,
}: {
  q: string
  bot: string
  telegramClient: TelegramClient
}) {
  const result = await telegramClient.invoke(
    new Api.messages.Search({
      peer: bot,
      q,
      filter: new Api.InputMessagesFilterPhotos(),
      limit: 20,
      maxDate: moment().unix(),
      minDate: moment().subtract(5, 'days').unix(),
    }),
  )

  return result.toJSON()
}
