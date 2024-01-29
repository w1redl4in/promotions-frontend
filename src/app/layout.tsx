import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/react'
import { Providers } from './providers'

const rubik = Rubik({ subsets: ['latin'], weight: ['400', '700', '900'] })

export const metadata: Metadata = {
  title: 'gengar.',
  description: 'buscamos promoções para você em troca de TM Shadow Ball.',
  viewport:
    'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={rubik.className} lang="pt" suppressHydrationWarning>
      <Toaster />
      <Providers>
        <body>{children}</body>
      </Providers>
      <Analytics />
    </html>
  )
}
