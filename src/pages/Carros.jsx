
import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import Card from '../components/Card'
import { carros } from '../data/carros'

const categorias = ['Todos', ...new Set(carros.map((carro) => carro.categoria))]

export default function Carros() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos')
  const [termoBusca, setTermoBusca] = useState('')
  const [ordenacao, setOrdenacao] = useState('padrao')
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null)

  const limparFiltros = () => {
    setTermoBusca('')
    setCategoriaSelecionada('Todos')
    setOrdenacao('padrao')
  }

  const filtrosAtivos =
    termoBusca.trim() !== '' ||
    categoriaSelecionada !== 'Todos' ||
    ordenacao !== 'padrao'

  const carrosFiltrados = carros
    .filter((carro) => {
      const correspondeCategoria =
        categoriaSelecionada === 'Todos' ||
        carro.categoria === categoriaSelecionada

      const nomeCarro = `${carro.marca} ${carro.modelo}`.toLowerCase()
      const correspondeBusca = nomeCarro.includes(
        termoBusca.trim().toLowerCase(),
      )

      return correspondeCategoria && correspondeBusca
    })
    .sort((a, b) => {
      if (ordenacao === 'menor-preco') {
        return a.preco - b.preco
      }

      if (ordenacao === 'maior-preco') {
        return b.preco - a.preco
      }

      return 0
    })

  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-white/10 pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            A coleção
          </p>

          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
            Nossa frota
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
            Explore veículos que representam o encontro entre engenharia,
            elegância e performance. Escolha a categoria que combina com
            você.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <SlidersHorizontal size={18} className="text-amber-400" />
            Filtrar por categoria
          </div>

          <div className="flex flex-wrap gap-2">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                type="button"
                onClick={() => setCategoriaSelecionada(categoria)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  categoriaSelecionada === categoria
                    ? 'border-amber-400 bg-amber-400 text-zinc-950'
                    : 'border-white/15 text-zinc-300 hover:border-amber-400 hover:text-white'
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="busca-carros"
            className="mb-2 block text-sm text-zinc-400"
          >
            Buscar por marca ou modelo
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-zinc-900 px-4 transition focus-within:border-amber-400">
            <Search size={18} className="shrink-0 text-amber-400" />

            <input
              id="busca-carros"
              type="search"
              value={termoBusca}
              onChange={(evento) => setTermoBusca(evento.target.value)}
              placeholder="Ex.: Porsche, BMW, Ferrari..."
              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label
            htmlFor="ordenacao-carros"
            className="text-sm text-zinc-400"
          >
            Ordenar veículos
          </label>

          <select
            id="ordenacao-carros"
            value={ordenacao}
            onChange={(evento) => setOrdenacao(evento.target.value)}
            className="rounded-xl border border-white/15 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400"
          >
            <option value="padrao">Ordem padrão</option>
            <option value="menor-preco">Menor preço</option>
            <option value="maior-preco">Maior preço</option>
          </select>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-zinc-400">
            {carrosFiltrados.length}{' '}
            {carrosFiltrados.length === 1
              ? 'veículo encontrado'
              : 'veículos encontrados'}
          </p>

          <div className="flex items-center gap-4">
            <p className="text-xs text-zinc-500">
              Valores demonstrativos por diária
            </p>

            {filtrosAtivos && (
              <button
                type="button"
                onClick={limparFiltros}
                className="inline-flex items-center gap-1 text-sm text-amber-400 transition hover:text-amber-300"
              >
                <X size={15} />
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        {carrosFiltrados.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {carrosFiltrados.map((carro) => (
              <Card
                key={carro.id}
                carro={carro}
                onDemonstrarInteresse={setVeiculoSelecionado}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-zinc-400">
              Nenhum veículo corresponde à sua busca ou aos filtros selecionados.
            </p>

            <button
              type="button"
              onClick={limparFiltros}
              className="rounded-full border border-amber-400 px-5 py-2 text-sm text-amber-400 transition hover:bg-amber-400 hover:text-zinc-950"
            >
              Limpar busca e filtros
            </button>
          </div>
        )}

        {veiculoSelecionado && (
          <div className="mt-8 rounded-2xl border border-amber-400/30 bg-zinc-900 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Seu veículo de interesse
            </p>

            <h2 className="mt-2 text-xl font-semibold text-white">
              {veiculoSelecionado.marca} {veiculoSelecionado.modelo}
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Veículo selecionado. O formulário de solicitação será adicionado
              na próxima etapa.
            </p>

            <button
              type="button"
              onClick={() => setVeiculoSelecionado(null)}
              className="mt-4 rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:border-amber-400"
            >
              Cancelar seleção
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
