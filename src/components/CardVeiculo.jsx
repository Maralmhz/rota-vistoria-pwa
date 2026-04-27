import React from 'react'
import { fundoBadgeStatus, textoDoStatus } from '../utils/statusHelper'
import { formatarData } from '../utils/formatadores'

export default function CardVeiculo({ veiculo, onPress, onEditar, onDeletar }) {
  const corBorda = veiculo.status === 'ATRASADO' ? 'border-atrasado' : veiculo.status === 'FINALIZADO' ? 'border-finalizado' : 'border-em-reparo'
  const corTipo = veiculo.tipo === 'ASSOCIADO' ? 'bg-associado-bg text-associado' : 'bg-terceiro-bg text-terceiro'
  return (
    <div
      className={`bg-secondary rounded-xl p-4 shadow-md border-l-4 ${corBorda} mb-3 cursor-pointer active:scale-[0.99] transition-transform`}
      onClick={onPress}
    >
      <div className="flex justify-between items-start mb-1">
        <div>
          <p className="text-white font-bold text-base">{veiculo.modelo}</p>
          <p className="text-accent font-semibold text-sm">{veiculo.placa}</p>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${fundoBadgeStatus(veiculo.status)}`}>
          {textoDoStatus(veiculo.status)}
        </span>
      </div>
      <p className="text-slate-300 text-sm mb-1">👤 {veiculo.nome_proprietario}</p>
      {veiculo.cor && <p className="text-slate-400 text-xs mb-2">🎨 {veiculo.cor}</p>}
      <div className="flex justify-between items-center">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${corTipo}`}>{veiculo.tipo}</span>
        <div className="text-right">
          <p className="text-slate-400 text-xs">Entrada: {formatarData(veiculo.data_entrada)}</p>
          <p className="text-slate-400 text-xs">Previsão: {formatarData(veiculo.previsao_saida)}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-3 pt-3 border-t border-tertiary" onClick={e => e.stopPropagation()}>
        <button onClick={onEditar} className="flex-1 text-xs text-slate-400 py-1.5 rounded-lg bg-primary hover:bg-tertiary transition-colors">✏️ Editar</button>
        <button onClick={onDeletar} className="flex-1 text-xs text-atrasado py-1.5 rounded-lg bg-atrasado-bg hover:opacity-80 transition-opacity">🗑️ Remover</button>
      </div>
    </div>
  )
}
