import { FormEvent, useEffect, useRef, useState } from 'react'
import { Promotion } from '../api/promotions/types'
import { toast } from 'sonner'

export function usePromotions() {
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [data, setData] = useState<Promotion[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setIsLoading(true)
    event.preventDefault()
    try {
      const response = await fetch(`/api/promotions?search=${search}`)
      const data = await response.json()

      if (data.length === 0) {
        toast('a gengar pokemon has appeared 1!!', {
          description: `gengar não conseguiu encontrar nenhuma promoção para ${search} nos últimos 5 dias...`,
        })
        setIsLoading(false)
        setSearch('')
        setIsModalOpen(false)
        inputRef?.current?.focus()
        return
      }

      setIsLoading(false)
      setData(data)
      setIsModalOpen(data)
      inputRef?.current?.focus()
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setIsModalOpen(false)
      inputRef?.current?.focus()
    }
  }

  function handleClose() {
    setIsLoading(false)
    setData([])
    setSearch('')
    setIsModalOpen(false)
  }

  useEffect(() => {
    inputRef?.current?.focus()
  }, [isModalOpen])

  return {
    isLoading,
    search,
    setSearch,
    data,
    isModalOpen,
    inputRef,
    handleSubmit,
    handleClose,
  }
}
