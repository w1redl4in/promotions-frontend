import Image from 'next/image'

export function Header() {
  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-xl sm:text-xl md:text-5xl font-bold text-white">
        gengar
        <span className="text-violet-400 text-xl sm:text-xl md:text-5xl">
          .
        </span>
      </h1>
      <div className="flex flex-col items-center gap-4 pr-4">
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
