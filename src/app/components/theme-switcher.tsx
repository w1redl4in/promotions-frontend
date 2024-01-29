'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Image from 'next/image'
export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted)
    return (
      <Image
        src="/gengar.png"
        width={50}
        height={50}
        sizes="50x50"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
      />
    )

  if (resolvedTheme === 'dark') {
    return (
      <Image
        width={80}
        height={80}
        alt="shiny gengar"
        style={{
          filter: 'drop-shadow(0 0 3px crimson)',
        }}
        src="/gengar-shiny.png"
        className="w-20 h-20 cursor-pointer hover:scale-105 duration-200"
        onClick={() => setTheme('light')}
      />
    )
  }

  if (resolvedTheme === 'light') {
    return (
      <Image
        width={80}
        height={80}
        alt="normal gengar"
        style={{
          filter: 'drop-shadow(0 0 3px #f472b6)',
        }}
        src="/gengar.png"
        className="w-20 h-20 cursor-pointer hover:scale-105 duration-200"
        onClick={() => setTheme('dark')}
      />
    )
  }
}
