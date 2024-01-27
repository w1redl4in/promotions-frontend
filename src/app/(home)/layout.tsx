import { ReactNode } from 'react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="p-12 h-screen bg-zinc-950 flex flex-col justify-between">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
