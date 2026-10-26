
import { Link, NavLink } from 'react-router-dom'
import { CarFront, ArrowUpRight } from 'lucide-react'

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `transition-colors ${
      isActive ? 'text-amber-400' : 'text-zinc-400 hover:text-white'
    }`

  return (
    <header className="border-b border-white/10 bg-zinc-950">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/50 text-amber-400">
            <CarFront size={23} />
          </span>

          <span>
            <span className="block text-lg font-bold tracking-[0.16em] text-white">
              PRESTIGE
            </span>
            <span className="block text-[10px] tracking-[0.36em] text-amber-400">
              MOTORS
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-6 text-sm sm:gap-8">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/carros" className={linkClass}>
            Veículos
          </NavLink>

          <Link
            to="/carros"
            className="hidden items-center gap-2 rounded-full bg-amber-400 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-amber-300 sm:flex"
          >
            Explorar frota
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </nav>
    </header>
  )
}
