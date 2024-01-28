import { bots, getTelegramClient } from '@/app/config/telegram'
import { findPromotions } from '@/app/services/telegram'
import { NextRequest } from 'next/server'
import { Promotion } from './types'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search')

  if (!search) {
    return Response.json({
      error: 'Missing search param',
    })
  }

  const telegramClient = await getTelegramClient()

  let promotions: Promotion[] = []

  for await (const bot of bots) {
    const response = (await findPromotions({
      q: search,
      bot,
      telegramClient,
    })) as unknown as { messages: Promotion[] }

    promotions = [
      ...promotions,
      response.messages.flatMap((promotion) => ({
        message: promotion.message,
        date: promotion.date,
        views: promotion.views,
        reactions: promotion.reactions,
      })),
    ] as Promotion[]

    // promotions = [
    //   ...promotions,
    //   response.messages.flatMap((possiblePromo) => ({
    //     message: possiblePromo.message,
    //     date: possiblePromo.date,
    //     views: possiblePromo.views,
    //     reactions: {
    //       results: possiblePromo.reactions?.results,
    //     },
    //   })),
    // ]
  }

  const removingUndefinedValues = promotions
    ?.filter((message) => message)
    .flat()

  return Response.json(removingUndefinedValues)
}
