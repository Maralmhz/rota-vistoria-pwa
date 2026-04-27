import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { buscarOficinaPorId, buscarVeiculosPorOficina, removerVeiculo } from '../db/database'
import CardVeiculo from '../components/CardVeiculo'
import BotaoFlutuante from '../components/BotaoFlutuante'
import Navbar from '../components/Navbar'
import { abrirRota } from '../utils/mapas'
import { exportarOficina } from '../utils/exportacao'

export default function DetalheOficina() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [oficina, setOficina] = useState(null)
  const [veiculos, setVeiculos] = useState([])
  const [busca, setBusca] = useState('')

  const carregar = async () => {
    const o = await buscarOficinaPorId(id)
    setOficina(o)
    const v = await buscarVeiculosPorOficina(id, busca)
    setVeiculos(v)
  }

  useEffect(() => { carregar() }, [id, busca])

  const confirmarDelecao = async (v) => {
    if (window.confirm(`Remover ${v.modelo} (${v.placa})?`)) {
      await removerVeiculo(v.id)
      carregar()
    }
  }

  if (!oficina) return <div className="min-h-dvh bg-primary flex items-center justify-center"><p className="text-slate-400">Carregando...</p></div>

  return (
    <div className="min-h-dvh bg-primary flex flex-col">
      <Navbar titulo={oficina.nome} voltar />

      <div className="mx-4 mt-3 bg-secondary rounded-2xl p-4 border border-tertiary">
        <p className="text-slate-300 text-sm mb-1">📍 {oficina.endereco}</p>
        <p className="text-slate-400 text-xs mb-3">{oficina.cidade} - {oficina.estado}</p>
        <div className="flex gap-2">
          <button onClick={() => abrirRota(oficina)} className="flex-1 bg-em-reparo-bg text-em-reparo text-sm font-semibold py-2 rounded-xl">🗺️ Rota</button>
          <button onClick={() => exportarOficina(oficina)} className="flex-1 bg-finalizado-bg text-finalizado text-sm font-semibold py-2 rounded-xl">📤 Exportar</button>
          <button onClick={() => navigate(`/oficina/${id}/editar`)} className="flex-1 bg-tertiary text-slate-300 text-sm font-semibold py-2 rounded-xl">✏️ Editar</button>
        </div>
      </div>

      <div className="px-4 pt-3 pb-2">
        <input
          className="w-full bg-secondary border border-tertiary rounded-xl px-4 py-2.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-accent"
          placeholder="Buscar placa ou proprietário..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
      </div>

      <div className="flex-1 px-4 pb-24 overflow-y-auto">
        {veiculos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <span className="text-5xl">🚗</span>
            <p className="text-white font-bold">Nenhum veículo</p>
            <p className="text-slate-400 text-sm">Toque no + para adicionar</p>
          </div>
        ) : (
          veiculos.map(v => (
            <CardVeiculo
              key={v.id}
              veiculo={v}
              onPress={() => navigate(`/veiculo/${v.id}`)}
              onEditar={() => navigate(`/veiculo/${v.id}/editar`, { state: { oficina } })}
              onDeletar={() => confirmarDelecao(v)}
            />
          ))
        )}
      </div>

      <BotaoFlutuante onClick={() => navigate(`/oficina/${id}/veiculo/novo`)} cor="bg-finalizado" />
    </div>
  )
}
