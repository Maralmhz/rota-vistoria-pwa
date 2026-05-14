import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getOficinas, deletarOficina } from '../lib/api'
import CardOficina from '../components/CardOficina'
import BotaoFlutuante from '../components/BotaoFlutuante'
import Navbar from '../components/Navbar'

export default function Home() {
  const navigate = useNavigate()
  const [oficinas, setOficinas] = useState([])
  const [cidades, setCidades] = useState([])
  const [cidadeFiltro, setCidadeFiltro] = useState(null)
  const [busca, setBusca] = useState('')

  const carregar = async () => {
    const lista = await getOficinas(cidadeFiltro)
    setOficinas(lista)
    const c = [...new Set(lista.map(o => o.cidade).filter(Boolean))]
    setCidades(c)
  }

  useEffect(() => { carregar() }, [cidadeFiltro])

  const filtradas = busca
    ? oficinas.filter(o => o.nome.toLowerCase().includes(busca.toLowerCase()) || o.cidade.toLowerCase().includes(busca.toLowerCase()))
    : oficinas

  const confirmarDelecao = async (o) => {
    if (window.confirm(`Remover "${o.nome}" e todos os veículos?`)) {
      await deletarOficina(o.id)
      carregar()
    }
  }

  return (
    <div className="min-h-dvh bg-primary flex flex-col">
      <Navbar />

      <div className="px-4 pt-3 pb-2 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Buscar oficina ou cidade..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="w-full bg-secondary text-white placeholder-slate-500 rounded-xl px-4 py-2 text-sm border border-tertiary focus:outline-none"
        />
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setCidadeFiltro(null)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${
              cidadeFiltro === null ? 'bg-accent text-white border-accent' : 'bg-secondary text-slate-400 border-tertiary'
            }`}
          >
            Todas
          </button>
          {cidades.map(c => (
            <button
              key={c}
              onClick={() => setCidadeFiltro(c)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap transition ${
                cidadeFiltro === c ? 'bg-accent text-white border-accent' : 'bg-secondary text-slate-400 border-tertiary'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 pb-32 grid grid-cols-2 gap-3">
        {filtradas.map(o => (
          <CardOficina
            key={o.id}
            oficina={o}
            onEditar={() => navigate(`/editar-oficina/${o.id}`)}
            onRemover={() => confirmarDelecao(o)}
            onClick={() => navigate(`/oficina/${o.id}`)}
          />
        ))}
      </div>

      {/* Botoes de acao fixos no rodape */}
      <div className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-tertiary flex z-40">
        <button
          onClick={() => navigate('/backup')}
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-slate-400 active:bg-tertiary"
        >
          <span className="text-xl">📋</span>
          <span className="text-xs">Todas as Oficinas</span>
        </button>
        <button
          onClick={() => navigate('/backup')}
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-slate-400 active:bg-tertiary border-l border-tertiary"
        >
          <span className="text-xl">💾</span>
          <span className="text-xs">Backup & Exportar</span>
        </button>
      </div>

      <BotaoFlutuante onClick={() => navigate('/cadastrar-oficina')} />
    </div>
  )
}
