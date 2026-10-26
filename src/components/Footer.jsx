
import { Link } from 'react-router-dom'
import { CarFront } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <CarFront className="text-amber-400" size={25} />
          <span className="font-bold tracking-[0.16em] text-white">
            PRESTIGE MOTORS
          </span>
        </Link>

        <p className="text-sm text-zinc-500">
          Sofisticação em cada quilômetro.
        </p>

        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} Prestige Motors. Projeto acadêmico.
        </p>
      </div>
    </footer>
  )
}
