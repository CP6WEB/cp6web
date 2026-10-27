import { useState } from 'react'
import {
  CalendarDays,
  CheckCircle2,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import Card from '../components/Card'
import { carros } from '../data/carros'

const categorias = ['Todos', ...new Set(carros.map((carro) => carro.categoria))]

export default function Carros() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos')
  const [termoBusca, setTermoBusca] = useState('')
  const [ordenacao, setOrdenacao] = useState('padrao')
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [dataRetirada, setDataRetirada] = useState('')
  const [dataDevolucao, setDataDevolucao] = useState('')
  const [solicitacaoEnviada, setSolicitacaoEnviada] = useState(false)

  const limparFiltros = () => {
    setTermoBusca('')
    setCategoriaSelecionada('Todos')
    setOrdenacao('padrao')
  }

  const selecionarVeiculo = (carro) => {
    setVeiculoSelecionado(carro)
    setSolicitacaoEnviada(false)
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

  const hoje = new Date().toLocaleDateString('en-CA')

  const enviarSolicitacao = (evento) => {
    evento.preventDefault()

    if (
      !veiculoSelecionado ||
      !nome.trim() ||
      !email.trim() ||
      !dataRetirada ||
      !dataDevolucao
    ) {
      return
    }

    if (dataRetirada < hoje || dataDevolucao <= dataRetirada) {
      return
    }

    setNome(nome.trim())
    setEmail(email.trim())
    setSolicitacaoEnviada(true)
  }

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
          <label htmlFor="ordenacao-carros" className="text-sm text-zinc-400">
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
                onDemonstrarInteresse={selecionarVeiculo}
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
          <section className="mt-10 rounded-2xl border border-white/10 bg-zinc-900 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-amber-400" size={22} />

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                  Solicitação de interesse
                </p>

                <h2 className="mt-1 text-2xl font-semibold text-white">
                  {veiculoSelecionado.marca} {veiculoSelecionado.modelo}
                </h2>
              </div>
            </div>

            {solicitacaoEnviada ? (
              <div className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-5">
                <CheckCircle2 className="text-emerald-400" size={28} />

                <h3 className="mt-3 text-lg font-semibold text-white">
                  Solicitação registrada nesta demonstração
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Obrigado, {nome}! Os dados foram validados na interface, mas
                  não foram enviados a um servidor nem armazenados.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSolicitacaoEnviada(false)
                    setVeiculoSelecionado(null)
                    setNome('')
                    setEmail('')
                    setDataRetirada('')
                    setDataDevolucao('')
                  }}
                  className="mt-5 rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300"
                >
                  Concluir
                </button>
              </div>
            ) : (
              <form onSubmit={enviarSolicitacao} className="mt-6">
                <p className="mb-6 text-sm leading-6 text-zinc-400">
                  Preencha seus dados e o período desejado para demonstrar
                  interesse na locação deste veículo.
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="nome-interesse"
                      className="mb-2 block text-sm text-zinc-300"
                    >
                      Nome completo
                    </label>

                    <input
                      id="nome-interesse"
                      type="text"
                      autoComplete="name"
                      required
                      minLength={3}
                      value={nome}
                      onChange={(evento) => setNome(evento.target.value)}
                      placeholder="Seu nome"
                      className="w-full rounded-xl border border-white/15 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email-interesse"
                      className="mb-2 block text-sm text-zinc-300"
                    >
                      E-mail
                    </label>

                    <input
                      id="email-interesse"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(evento) => setEmail(evento.target.value)}
                      placeholder="voce@exemplo.com"
                      className="w-full rounded-xl border border-white/15 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="data-retirada"
                      className="mb-2 block text-sm text-zinc-300"
                    >
                      Data de retirada
                    </label>

                    <input
                      id="data-retirada"
                      type="date"
                      required
                      min={hoje}
                      value={dataRetirada}
                      onChange={(evento) => {
                        setDataRetirada(evento.target.value)

                        if (
                          dataDevolucao &&
                          evento.target.value >= dataDevolucao
                        ) {
                          setDataDevolucao('')
                        }
                      }}
                      className="w-full rounded-xl border border-white/15 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="data-devolucao"
                      className="mb-2 block text-sm text-zinc-300"
                    >
                      Data de devolução
                    </label>

                    <input
                      id="data-devolucao"
                      type="date"
                      required
                      min={dataRetirada || hoje}
                      value={dataDevolucao}
                      onChange={(evento) => setDataDevolucao(evento.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300"
                  >
                    Enviar solicitação
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setVeiculoSelecionado(null)
                      setSolicitacaoEnviada(false)
                    }}
                    className="rounded-full border border-white/20 px-6 py-3 text-sm text-white transition hover:border-amber-400"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </section>
        )}
      </div>
    </main>
  )
}
