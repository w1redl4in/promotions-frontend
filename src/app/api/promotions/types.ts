export interface Promotion {
  message: string
  date: number
  views: number
  media: any
  entities: {
    url?: string
  }[]
  reactions: {
    results: {
      reaction: {
        emoticon: string
      }
      count: number
    }[]
  }
}
