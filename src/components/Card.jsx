
import { ArrowUpRight, Gauge, Users } from 'lucide-react'
import { formatarPreco } from '../data/carros'

export default function Card({ carro, onDemonstrarInteresse }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-amber-400/40">
      <div className="relative h-56 overflow-hidden bg-zinc-800">
        <img
          src={carro.imagem}
          alt={`${carro.marca} ${carro.modelo}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
          {carro.categoria}
        </span>

        {carro.destaque && (
          <span className="absolute right-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-zinc-950">
            Destaque
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-400">
          {carro.marca} · {carro.ano}
        </p>

        <h3 className="mt-2 text-xl font-semibold text-white">
          {carro.modelo}
        </h3>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-400">
          <span className="flex items-center gap-2">
            <Gauge size={16} className="text-amber-400" />
            {carro.potencia}
          </span>

          <span className="flex items-center gap-2">
            <Users size={16} className="text-amber-400" />
            {carro.lugares} lugares
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-5">
          <div>
            <p className="text-xs text-zinc-500">Diária a partir de</p>
            <p className="mt-1 text-xl font-bold text-white">
              {formatarPreco(carro.preco)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onDemonstrarInteresse(carro)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-amber-400 hover:bg-amber-400 hover:text-zinc-950"
            aria-label={`Demonstrar interesse em ${carro.marca} ${carro.modelo}`}
            title="Tenho interesse neste veículo"
          >
            <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </article>
  )
}
