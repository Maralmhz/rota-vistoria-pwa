import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { buscarTodasOficinas, removerOficina, buscarCidades } from '../db/database'
import CardOficina from '../components/CardOficina'
import BotaoFlutuante from '../components/BotaoFlutuante'
import Navbar from '../components/Navbar'

export default function Home() {
  const navigate = useNavigate()
  const [oficinas, setOficinas] = useState([])
  const [cidades, setCidades] = useState([])
  const [cidadeFiltro, setCidadeFiltro] = useState(null)
  const [busca, setBusca] = useState('')
  const [menuAberto, setMenuAberto] = useState(false)

  const carregar = async () => {
    const lista = await buscarTodasOficinas(cidadeFiltro)
    setOficinas(lista)
    const c = await buscarCidades()
    setCidades(c)
  }

  useEffect(() => { carregar() }, [cidadeFiltro])

  const filtradas = busca
    ? oficinas.filter(o => o.nome.toLowerCase().includes(busca.toLowerCase()) || o.cidade.toLowerCase().includes(busca.toLowerCase()))
    : oficinas

  const confirmarDelecao = async (o) => {
    if (window.confirm(`Remover "${o.nome}" e todos os veículos?`)) {
      await removerOficina(o.id)
      carregar()
    }
  }

  return (
    <div className="min-h-dvh bg-primary flex flex-col">
      <Navbar
        titulo="🚗 Rota Vistoria"
        acoes={
          <button onClick={() => setMenuAberto(!menuAberto)} className="text-slate-400 text-2xl w-9 h-9 flex items-center justify-center rounded-full active:bg-tertiary">⋮</button>
        }
      />

      {menuAberto && (
        <div className="absolute right-4 top-14 bg-secondary border border-tertiary rounded-2xl shadow-2xl z-50 overflow-hidden w-52">
          {[
            { label: '📋 Todas as Oficinas', path: '/backup', fn: () => { navigate('/backup'); setMenuAberto(false) } },
            { label: '💾 Backup & Exportar', fn: () => { navigate('/backup'); setMenuAberto(false) } },
          ].map((item, i) => (
            <button key={i} onClick={item.fn} className="w-full text-left px-4 py-3 text-slate-300 text-sm hover:bg-tertiary border-b border-tertiary last:border-0">{item.label}</button>
          ))}
        </div>
      )}

      <div className="px-4 pt-3 pb-2">
        <input
          className="w-full bg-secondary border border-tertiary rounded-xl px-4 py-2.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-accent"
          placeholder="Buscar oficina ou cidade..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
      </div>

      {cidades.length > 1 && (
        <div className="flex gap-2 px-4 pb-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setCidadeFiltro(null)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors ${
              !cidadeFiltro ? 'bg-accent text-primary border-accent' : 'bg-secondary text-slate-400 border-tertiary'
            }`}
          >Todas</button>
          {cidades.map(c => (
            <button
              key={c}
              onClick={() => setCidadeFiltro(cidadeFiltro === c ? null : c)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors ${
                cidadeFiltro === c ? 'bg-accent text-primary border-accent' : 'bg-secondary text-slate-400 border-tertiary'
              }`}
            >{c}</button>
          ))}
        </div>
      )}

      <div className="flex-1 px-3 pb-24 overflow-y-auto">
        {filtradas.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <span className="text-6xl">🏪</span>
            <p className="text-white font-bold text-xl">Nenhuma oficina</p>
            <p className="text-slate-400 text-sm">Toque no + para adicionar</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 pt-2">
            {filtradas.map(o => (
              <CardOficina
                key={o.id}
                oficina={o}
                onPress={() => navigate(`/oficina/${o.id}`)}
                onEditar={() => navigate(`/oficina/${o.id}/editar`)}
                onDeletar={() => confirmarDelecao(o)}
              />
            ))}
          </div>
        )}
      </div>

      <BotaoFlutuante onClick={() => navigate('/oficina/nova')} />
    </div>
  )
}
