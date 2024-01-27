import { bots, getTelegramClient } from '@/app/config/telegram'
import { findPromotions } from '@/app/services/telegram'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search')

  if (!search) {
    return Response.json({
      error: 'Missing search param',
    })
  }

  const telegramClient = await getTelegramClient()

  let messages = [''] as string[] | undefined | any

  for await (const bot of bots) {
    const response = (await findPromotions({
      q: search,
      bot,
      telegramClient,
    })) as {
      messages: {
        reactions: {
          results: {
            reaction: {
              emoticon: string
            }
          }
          count: number
        }
        message: string
        date: number
        views: number
      }[]
      count: number
    }

    messages = [
      ...messages,
      response?.messages?.length
        ? response.messages.flatMap((possiblePromo) => ({
            message: possiblePromo.message,
            date: possiblePromo.date,
            views: possiblePromo.views,
            reactions: {
              results: possiblePromo.reactions?.results,
            },
          }))
        : undefined,
    ]
  }

  const removingUndefinedValues = messages
    .filter((message: string) => message)
    .flat()

  return Response.json(removingUndefinedValues)
}
