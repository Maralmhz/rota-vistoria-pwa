import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { exportarBackup, importarBackup, exportarTodasOficinas, exportarAtrasados } from '../utils/exportacao'

export default function Backup() {
  const [status, setStatus] = useState(null)
  const [carregando, setCarregando] = useState(false)

  const executar = async (fn) => {
    setCarregando(true); setStatus(null)
    try {
      const r = await fn()
      setStatus({ tipo: 'sucesso', msg: r ? `✅ ${r.totalOficinas} oficinas e ${r.totalVeiculos} veículos processados.` : '✅ Exportado com sucesso!' })
    } catch (e) {
      setStatus({ tipo: 'erro', msg: `❌ ${e.message}` })
    } finally { setCarregando(false) }
  }

  const handleImportar = async (e) => {
    const arquivo = e.target.files[0]
    if (!arquivo) return
    if (!window.confirm('Isso substituirá TODOS os dados atuais. Continuar?')) return
    executar(() => importarBackup(arquivo))
  }

  const BotaoAcao = ({ icone, titulo, sub, onClick, cor = 'border-tertiary' }) => (
    <button
      onClick={onClick}
      disabled={carregando}
      className={`w-full bg-secondary border ${cor} rounded-2xl p-4 flex items-center gap-4 mb-3 active:opacity-70 disabled:opacity-40 text-left transition-opacity`}
    >
      <span className="text-3xl">{icone}</span>
      <div>
        <p className="text-white font-bold text-sm">{titulo}</p>
        <p className="text-slate-400 text-xs mt-0.5">{sub}</p>
      </div>
    </button>
  )

  return (
    <div className="min-h-dvh bg-primary flex flex-col">
      <Navbar titulo="Backup & Exportação" voltar />
      <div className="flex-1 px-4 pt-4 pb-8 overflow-y-auto">
        {status && (
          <div className={`mb-4 p-3 rounded-xl text-sm font-medium ${
            status.tipo === 'sucesso' ? 'bg-finalizado-bg text-finalizado' : 'bg-atrasado-bg text-atrasado'
          }`}>{status.msg}</div>
        )}

        <p className="text-slate-400 text-xs font-semibold mb-3 uppercase tracking-wider">💾 Backup</p>
        <BotaoAcao icone="⬆️" titulo="Exportar Backup JSON" sub="Salva tudo e compartilha via WhatsApp" onClick={() => executar(exportarBackup)} cor="border-accent" />
        <label className="block mb-3">
          <div className="w-full bg-secondary border border-aviso rounded-2xl p-4 flex items-center gap-4 cursor-pointer active:opacity-70">
            <span className="text-3xl">⬇️</span>
            <div>
              <p className="text-white font-bold text-sm">Restaurar Backup JSON</p>
              <p className="text-slate-400 text-xs mt-0.5">Importa um arquivo .json salvo</p>
            </div>
          </div>
          <input type="file" accept=".json" className="hidden" onChange={handleImportar} />
        </label>

        <p className="text-slate-400 text-xs font-semibold mb-3 mt-5 uppercase tracking-wider">📤 Exportar Listas</p>
        <BotaoAcao icone="🏪" titulo="Todas as Oficinas" sub="Lista completa de oficinas e veículos" onClick={() => executar(exportarTodasOficinas)} />
        <BotaoAcao icone="⚠️" titulo="Veículos Atrasados" sub="Só os veículos com prazo vencido" onClick={() => executar(exportarAtrasados)} cor="border-atrasado" />

        <div className="mt-6 bg-secondary rounded-2xl p-4 border border-tertiary">
          <p className="text-slate-400 text-xs font-bold mb-2">ℹ️ Como funciona</p>
          <p className="text-slate-500 text-xs leading-relaxed">
            • O backup é um arquivo JSON com todos os dados.{"\n"}
            • Compartilhe via WhatsApp para guardar.{"\n"}
            • Para restaurar, abra o arquivo e importe.{"\n"}
            • Os dados ficam no navegador do celular (IndexedDB).
          </p>
        </div>
      </div>
    </div>
  )
}
