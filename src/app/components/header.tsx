import Image from 'next/image'
import { ThemeSwitcher } from './theme-switcher'

export function Header() {
  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-xl sm:text-xl md:text-5xl font-bold text-zinc-950 dark:text-white">
        gengar
        <span className="text-pink-400 dark:text-violet-400 text-xl sm:text-xl md:text-5xl">
          .
        </span>
      </h1>
      <div className="flex flex-col items-center gap-4 pr-4">
        <ThemeSwitcher />
      </div>
    </div>
  )
}
