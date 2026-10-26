import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Carros from './pages/Carros'

function Conteudo() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carros" element={<Carros />} />
          <Route
            path="*"
            element={
              <main className="flex min-h-[60vh] items-center justify-center px-5 text-center">
                <div>
                  <h1 className="text-4xl font-bold text-white">
                    Página não encontrada
                  </h1>
                  <p className="mt-3 text-zinc-400">
                    O endereço acessado não existe.
                  </p>
                </div>
              </main>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Conteudo />
    </BrowserRouter>
  )
}
