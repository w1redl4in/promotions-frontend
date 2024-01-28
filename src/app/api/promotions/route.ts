import { getTelegramClient } from '@/app/config/telegram'
import { findPromotions } from '@/app/services/telegram'
import { NextRequest } from 'next/server'
import { Promotion } from './types'
import { env } from '@/app/config/env'

export async function GET(request: NextRequest) {
  const bots = env.NEXT_PUBLIC_BOTS_TELEGRAM.split(',')
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search')

  console.info(`buscando por promoções de ${search} em ${bots}`)

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
        media: promotion.media,
        entities: promotion.entities,
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
