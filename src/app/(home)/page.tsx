'use client'

import { Calendar, Eye, Search, SearchCheck, Shell, Wand2 } from 'lucide-react'
import { FormEvent, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setIsLoading(true)
    event.preventDefault()
    try {
      const response = await fetch(`/api/promotions?search=${search}`)
      const data = await response.json()
      setData(data)
      setIsModalOpen(true)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setIsModalOpen(false)
    }
  }

  function handleClose() {
    setIsModalOpen(false)
    setData([])
    setSearch('')
    setIsLoading(false)
  }

  return (
    <main>
      <div className="flex h-full items-start justify-center py-9">
        <form
          onSubmit={handleSubmit}
          className="flex w-[600px] flex-col items-center gap-3  "
        >
          <div className="flex items-center w-full h-full gap-4 bg-zinc-900 px-5 py-4 ring-zinc-700 rounded-lg text-zinc-200">
            <Search className="w-10 h-10 text-zinc-500" />
            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value.charAt(0).toUpperCase() +
                  event.target.value.slice(1),
                )
              }
              type="text"
              placeholder="Busque promoções como: i5 13600KF"
              className="flex-1 bg-transparent text-2xl outline-none placeholder:text-zinc-500"
            />
          </div>
          <button
            type="submit"
            className={`${isLoading && 'flex-col'} group flex items-center justify-center gap-3 w-[300px] bg-zinc-800 px-5 py-4 rounded-lg hover:bg-zinc-900 duration-200 text-2xl text-zinc-400 disabled:bg-zinc-900 disabled:text-zinc-700 disabled:cursor-not-allowed disabled:scale-100 hover:scale-105`}
            disabled={search === ''}
          >
            {isLoading
              ? 'A busca pode demorar um pouco... da uma segurada'
              : 'Curse'}
            <Shell
              className={`w-8 h-8 group-hover:text-violet-500 group-disabled:text-zinc-700 duration-200 ${isLoading && 'animate-spin text-violet-500'}`}
            />
          </button>
        </form>
      </div>

      <Dialog open={isModalOpen}>
        <DialogContent className="bg-zinc-950 text-zinc-500 border-zinc-900 h-3/5 overflow-scroll">
          <DialogHeader>
            <DialogTitle className="text-center mb-2 flex flex-col gap-4">
              <span>
                promoções coletadas pelo
                <span className="text-violet-500"> gengar</span>
              </span>

              <span className="flex gap-2 justify-center items-center text-violet-500 text-1xl">
                {`{${search}}`}
                <SearchCheck className="w-7 h-7" />
              </span>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="m-auto flex flex-wrap">
            {data.map((promotion) => (
              <div
                key={promotion?.message}
                className="flex flex-col justify-between break-words w-full max-w-[400px] border border-zinc-900 m-2 rounded-sm overflow-scroll p-7 text-wrap"
              >
                {promotion.message}
                <div className="gap-4 flex mt-4 font-semibold">
                  <span className="flex gap-2">
                    <Eye className="w-6 h-6 text-violet-500" />
                    {promotion.views.toLocaleString('pt-br')}
                  </span>
                  <span className="flex gap-2">
                    <Calendar className="w-6 h-6 text-violet-500" />
                    {new Date(promotion.date).toLocaleDateString('pt-br')}
                  </span>
                  {promotion?.reactions?.results?.map((reaction) => (
                    <span className="flex gap-2" key={reaction.flags}>
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
            ))}
          </div>
          <DialogClose
            className="group flex items-center justify-center gap-2 sticky bottom-[-10px] right-0 m-auto"
            asChild
            onClick={handleClose}
          >
            <button className="w-[200px] bg-zinc-800 px-5 py-4 rounded-lg hover:bg-zinc-900 duration-200 text-xl text-zinc-400">
              Shadow Ball
              <Wand2
                className={`w-6 h-6 group-hover:text-violet-500 group-disabled:text-zinc-700 `}
              />
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </main>
  )
}
