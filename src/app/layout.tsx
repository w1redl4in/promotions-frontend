import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import './globals.css'

const inter = Rubik({ subsets: ['latin'], weight: ['400', '700', '900'] })

export const metadata: Metadata = {
  title: 'gengar.',
  description: 'o que o gengar trouxe para nós hoje?',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={inter.className} lang="pt">
      <body>{children}</body>
    </html>
  )
}
