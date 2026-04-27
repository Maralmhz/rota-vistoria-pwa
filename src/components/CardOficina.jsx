import React from 'react'

export default function CardOficina({ oficina, onPress, onEditar, onDeletar }) {
  const temAtrasados = oficina.total_atrasados > 0
  return (
    <div
      className={`bg-secondary rounded-2xl p-4 shadow-lg border cursor-pointer active:scale-95 transition-transform select-none ${
        temAtrasados ? 'border-atrasado' : 'border-tertiary'
      }`}
      onClick={onPress}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-white font-bold text-base leading-tight flex-1 mr-2">{oficina.nome}</h3>
        {temAtrasados && (
          <span className="bg-atrasado-bg text-atrasado text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
            ⚠️ {oficina.total_atrasados}
          </span>
        )}
      </div>
      <p className="text-slate-400 text-xs mb-2">📍 {oficina.cidade} - {oficina.estado}</p>
      <p className="text-slate-400 text-xs mb-3">🚗 {oficina.total_veiculos} veículo{oficina.total_veiculos !== 1 ? 's' : ''}</p>
      <div className="flex gap-1.5 flex-wrap">
        {oficina.total_em_reparo > 0 && <span className="bg-em-reparo-bg text-em-reparo text-xs px-2 py-0.5 rounded-full">🔧 {oficina.total_em_reparo}</span>}
        {oficina.total_finalizados > 0 && <span className="bg-finalizado-bg text-finalizado text-xs px-2 py-0.5 rounded-full">✅ {oficina.total_finalizados}</span>}
        {temAtrasados && <span className="bg-atrasado-bg text-atrasado text-xs px-2 py-0.5 rounded-full">⚠️ {oficina.total_atrasados}</span>}
      </div>
      <div className="flex gap-2 mt-3 pt-3 border-t border-tertiary" onClick={e => e.stopPropagation()}>
        <button onClick={onEditar} className="flex-1 text-xs text-slate-400 py-1.5 rounded-lg bg-primary hover:bg-tertiary transition-colors">✏️ Editar</button>
        <button onClick={onDeletar} className="flex-1 text-xs text-atrasado py-1.5 rounded-lg bg-atrasado-bg hover:opacity-80 transition-opacity">🗑️ Remover</button>
      </div>
    </div>
  )
}
