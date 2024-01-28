export interface Promotion {
  message: string
  date: number
  views: number
  reactions: {
    results: {
      reaction: {
        emoticon: string
      }
    }[]
    count: number
  }[]
}
