import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import Card from '../components/Card'
import { carros } from '../data/carros'

export default function Home() {
  const destaques = carros.filter((carro) => carro.destaque)

  return (
    <>
      <section className="relative isolate min-h-[620px] overflow-hidden bg-zinc-950">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=90"
          alt="Automóvel de luxo em destaque"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/30" />

        <div className="mx-auto flex min-h-[620px] max-w-7xl items-center px-5 py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400 sm:text-sm">
              <span className="h-px w-10 bg-amber-400" />
              Experiência automotiva exclusiva
            </p>

            <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
              O extraordinário
              <br />
              <span className="font-light italic text-amber-400">
                está ao seu alcance.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-zinc-300 sm:text-lg">
              Descubra uma seleção de veículos importados que unem
              desempenho, design e sofisticação em cada quilômetro.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/carros"
                className="inline-flex items-center gap-3 rounded-full bg-amber-400 px-7 py-4 font-semibold text-zinc-950 transition hover:bg-amber-300"
              >
                Conheça nossa frota
                <ArrowRight size={18} />
              </Link>

              <a
                href="#destaques"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-white transition hover:border-amber-400 hover:text-amber-400"
              >
                Descobrir
                <ArrowDown size={17} />
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/20 pt-6 text-sm text-zinc-300">
              <span className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-amber-400" />
                Atendimento exclusivo
              </span>
              <span className="flex items-center gap-2">
                <Sparkles size={18} className="text-amber-400" />
                Seleção premium
              </span>
              <span className="flex items-center gap-2">
                <Zap size={18} className="text-amber-400" />
                Alta performance
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="destaques" className="bg-zinc-950 px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                Nossa seleção
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Máquinas extraordinárias.
              </h2>
              <p className="mt-3 max-w-xl text-zinc-400">
                Veículos selecionados para transformar cada trajeto em uma
                experiência memorável.
              </p>
            </div>

            <Link
              to="/carros"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 transition hover:text-amber-300"
            >
              Ver todos os veículos
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {destaques.map((carro) => (
              <Card key={carro.id} carro={carro} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-zinc-900 px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <p className="text-3xl font-semibold text-amber-400">01</p>
            <h3 className="mt-3 text-lg font-semibold text-white">
              Curadoria exclusiva
            </h3>
            <p className="mt-2 leading-6 text-zinc-400">
              Uma seleção de automóveis que se destacam pelo design e
              desempenho.
            </p>
          </div>

          <div>
            <p className="text-3xl font-semibold text-amber-400">02</p>
            <h3 className="mt-3 text-lg font-semibold text-white">
              Experiência premium
            </h3>
            <p className="mt-2 leading-6 text-zinc-400">
              Uma proposta de locação focada em conforto, estilo e praticidade.
            </p>
          </div>

          <div>
            <p className="text-3xl font-semibold text-amber-400">03</p>
            <h3 className="mt-3 text-lg font-semibold text-white">
              Liberdade para dirigir
            </h3>
            <p className="mt-2 leading-6 text-zinc-400">
              Encontre o veículo ideal para sua próxima experiência ao volante.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
