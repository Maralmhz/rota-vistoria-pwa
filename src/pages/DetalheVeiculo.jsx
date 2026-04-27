import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { buscarVeiculoPorId } from '../db/database'
import { fundoBadgeStatus, textoDoStatus, bordaStatus } from '../utils/statusHelper'
import { formatarData } from '../utils/formatadores'
import Navbar from '../components/Navbar'

export default function DetalheVeiculo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [veiculo, setVeiculo] = useState(null)

  useEffect(() => { buscarVeiculoPorId(id).then(setVeiculo) }, [id])

  if (!veiculo) return <div className="min-h-dvh bg-primary flex items-center justify-center"><p className="text-slate-400">Carregando...</p></div>

  const Linha = ({ label, valor }) => (
    <div className="flex justify-between py-3 border-b border-tertiary last:border-0">
      <span className="text-slate-400 text-sm">{label}</span>
      <span className="text-white text-sm font-semibold text-right max-w-[55%]">{valor || '—'}</span>
    </div>
  )

  return (
    <div className="min-h-dvh bg-primary flex flex-col">
      <Navbar titulo={`${veiculo.modelo} — ${veiculo.placa}`} voltar />
      <div className="flex-1 px-4 pt-4 pb-8 overflow-y-auto">
        <div className={`border-2 ${bordaStatus(veiculo.status)} bg-secondary rounded-2xl p-4 text-center mb-4`}>
          <p className={`text-lg font-bold ${fundoBadgeStatus(veiculo.status).split(' ')[1]}`}>{textoDoStatus(veiculo.status)}</p>
        </div>
        <div className="bg-secondary rounded-2xl p-4 border border-tertiary mb-4">
          <Linha label="Modelo" valor={veiculo.modelo} />
          <Linha label="Placa" valor={veiculo.placa} />
          <Linha label="Cor" valor={veiculo.cor} />
          <Linha label="Proprietário" valor={veiculo.nome_proprietario} />
          <Linha label="Tipo" valor={veiculo.tipo} />
          <Linha label="Entrada" valor={formatarData(veiculo.data_entrada)} />
          <Linha label="Previsão" valor={formatarData(veiculo.previsao_saida)} />
          <Linha label="Saída Real" valor={veiculo.data_saida_real ? formatarData(veiculo.data_saida_real) : 'Pendente'} />
          <Linha label="Oficina" valor={veiculo.oficina_nome} />
        </div>
        {veiculo.observacoes && (
          <div className="bg-secondary rounded-2xl p-4 border border-tertiary mb-4">
            <p className="text-slate-400 text-xs font-semibold mb-2">📝 OBSERVAÇÕES</p>
            <p className="text-white text-sm leading-relaxed">{veiculo.observacoes}</p>
          </div>
        )}
        <button
          onClick={() => navigate(`/veiculo/${id}/editar`)}
          className="w-full bg-accent text-primary font-bold text-base py-4 rounded-2xl"
          style={{ boxShadow: '0 4px 20px rgba(56,189,248,0.3)' }}
        >
          ✏️ Editar Veículo
        </button>
      </div>
    </div>
  )
}
