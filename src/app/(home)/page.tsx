/* eslint-disable prettier/prettier */
'use client'

import { Calendar, Eye, HandMetal, Search, SearchCheck, Shell, Wand2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { usePromotions } from '../hooks/use-promotions'
import moment from 'moment'
import 'moment/locale/pt-br'

moment.locale('pt-br')


export default function Home() {
  const { data, handleClose, handleSubmit, inputRef, isLoading, isModalOpen, search, setSearch } = usePromotions()

  function insertTagAAroundUrl(message: string, entities?: any[]) {
    const [messageTitle] = message.split('\n')

    const urls = entities?.filter((entity) => entity.url)

    const newMessage = message
      .replace(messageTitle, `<span class="text-sm lg:text-lg group-hover:text-pink-500 dark:group-hover:text-violet-300 duration-300 text-pink-400 dark:text-violet-400" >${messageTitle}</span>`)
      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-pink-500 dark:text-violet-500 underline" >$1</a>',
      )
      .replaceAll(
        /(R\$\s?)(\d{1,4})(\.\d{3})*(,\d{2})?/g,
        '<span class="text-green-500 dark:text-green-400 font-medium" >$1$2$3$4</span >',
      )
      .replaceAll(/(\d{1,2}x\s)/g, '<span class="text-yellow-500 dark:text-yellow-400" >$1</span >')
      .replaceAll(/(sem juros)/g, '<span class="text-violet-500 dark:text-pink-400 text-sm lg:text-md underline" >$1</span >')
      .replaceAll(/(cupom)/gi, '<span class="text-blue-500 dark:text-blue-400 font-normal uppercase">$1</span >')


    if (urls && urls.length > 0) {
      return newMessage.replace(/(>>\s*(.+?)\s*<<)/gi, `<a href="${urls[0].url}" target="_blank" rel="noopener noreferrer" class="text-pink-500 dark:text-violet-500 underline" >$1</a>`)
    }

    return newMessage
  }



  return (
    <main>
      <div className="flex h-full items-start justify-center py-9">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-[300px] sm:max-w-[400px] flex-col items-center gap-3"
        >
          <div className="flex items-center w-full h-full gap-4 bg-zinc-200 dark:bg-zinc-900 px-5 py-4 ring-zinc-700 rounded-lg text-zinc-800 dark:text-zinc-200">
            <Search className="w-5 h-5 md:h-6 md:w-6 text-zinc-500" />
            <input
              ref={inputRef}
              autoFocus
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value.charAt(0).toUpperCase() +
                  event.target.value.slice(1),
                )
              }
              type="text"
              placeholder="Sabia que o gengar já foi um humano?"
              className="flex-1 bg-transparent text-base sm:text-base md:text-base lg:text-lg outline-none placeholder:text-zinc-500"
            />
          </div>
          <button
            type="submit"
            className={`${isLoading && 'flex-col'} group flex items-center justify-center gap-2 w-full max-w-[300px] sm:max-w-[400px] bg-zinc-300 dark:bg-zinc-800 px-5 py-4 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-900 duration-200 text-md text-zinc-700 disabled:bg-zinc-200 dark:disabled:bg-zinc-900 disabled:text-zinc-400 dark:disabled:text-zinc-700 disabled:cursor-not-allowed disabled:scale-100 hover:scale-105`}
            disabled={search === ''}
          >
            {isLoading
              ? 'A busca pode demorar um pouco... já caçou o seu gengar shiny hj?'
              : 'Curse'}
            <Shell
              className={`w-5 h-5 md:h-8 md:w-8 group-hover:text-pink-500 dark:group-hover:text-violet-500 group-disabled:text-zinc-400 dark:group-disabled:text-zinc-700  ${isLoading && 'animate-spin text-pink-500 dark:text-violet-500'} duration-600`}
            />
          </button>
        </form>
      </div>

      <Dialog open={isModalOpen}>
        <DialogContent className="bg-zinc-100 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-500 border-zinc-50 dark:border-zinc-900 h-3/5 overflow-scroll">
          <DialogHeader>
            <DialogTitle className="text-center mb-2 flex flex-col gap-4">
              <span className="font-medium">
                promoções coletadas pelo
                <span className="text-pink-500 dark:text-violet-500"> gengar</span>
              </span>

              <span className="flex gap-2 justify-center items-center text-pink-500 dark:text-violet-500 text-1xl">
                {`{${search}}`}
                <SearchCheck className="w-7 h-7" />
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className="m-auto flex flex-wrap justify-center">
            {data.map((promotion) => (
              <div
                key={promotion?.message}
                className="group flex flex-col justify-around break-words max-w-[200px] md:max-w-[300px] w-full border border-zinc-300 dark:border-zinc-900 m-2 rounded-sm overflow-scroll p-4 text-wrap hover:border-zinc-400 dark:hover:border-zinc-800 duration-100"
              >
                <span
                  className="whitespace-pre-line text-xs lg:text-md"
                  dangerouslySetInnerHTML={{
                    __html: insertTagAAroundUrl(promotion.message, promotion.entities),
                  }}
                />
                <div className="flex flex-col gap-4 mt-4 font-normal">
                  <div className="flex flex-col justify-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="w-6 h-6 text-pink-500 dark:text-violet-500" />
                      <span className='text-xs lg:text-md'>
                        {promotion.views.toLocaleString('pt-br')} pessoas já viram essa promoção
                      </span>
                    </span>
                    <span className="flex gap-1 items-center">
                      <Calendar className="w-6 h-6 text-pink-500 dark:text-violet-500" />
                      <span className='text-xs lg:text-md'>
                        {moment.unix(promotion.date).format('DD/MM/YYYY - HH:mm - ')}
                        {moment.unix(promotion.date).fromNow()}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {promotion?.reactions?.results?.length > 0 && (

                      <div className='flex items-center gap-2'>

                        <HandMetal className="w-6 h-6 text-pink-500 dark:text-violet-500" />
                        <span className='text-xs lg:text-md'>

                          reações da galera
                        </span>
                      </div>
                    )}

                    <div className='flex gap-2 ml-8'>

                      {promotion?.reactions?.results?.map((reaction) => (
                        <span className="flex gap-2" key={reaction.reaction.emoticon}>
                          <div className="w-fit flex">
                            <span className="">{reaction.reaction.emoticon}</span>
                            <span className="text-xs font-bold text-zinc-500">
                              {reaction.count}
                            </span>
                          </div>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <DialogClose
            className="group flex items-center justify-center gap-2 sticky bottom-[-10px] right-0 m-auto"
            asChild
            onClick={handleClose}
          >
            <button className="bg-zinc-200 dark:bg-zinc-800 w-[180px] h-[20px] sm:w-[190px] sm:h-[40px] px-5 py-4 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-900 duration-200 text-sm lg:text-lg text-zinc-700 border border-zinc-400 dark:text-zinc-400 outline-none">
              Shadow Ball
              <Wand2
                className={`w-6 h-6 group-hover:text-pink-500 dark:group-hover:text-violet-500 group-disabled:text-zinc-700 `}
              />
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </main>
  )
}
