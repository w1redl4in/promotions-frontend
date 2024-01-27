import Image from 'next/image'

export function Header() {
  return (
    <div className="flex items-end justify-between">
      <h1 className="text-5xl font-bold text-white">
        gengar
        <span className="text-violet-400 text-5xl">.</span>
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-2xl text-zinc-400">
          Made with 💜 by Felipe Austríaco
        </span>
        <Image
          className="rounded-full h-10 w-10 border-2 border-violet-400"
          src="https://github.com/w1redl4in.png"
          width={40}
          height={40}
          alt=""
        />
      </div>
    </div>
  )
}
