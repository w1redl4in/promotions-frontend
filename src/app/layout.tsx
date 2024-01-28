import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Rubik({ subsets: ['latin'], weight: ['400', '700', '900'] })

export const metadata: Metadata = {
  title: 'gengar.',
  description: 'buscamos promoções para você em troca do TM Shadow Ball.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={inter.className} lang="pt">
      <Toaster />
      <body>{children}</body>
    </html>
  )
}
