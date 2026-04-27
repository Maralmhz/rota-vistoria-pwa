import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { buscarVeiculoPorId, salvarVeiculo } from '../db/database'
import InputCampo from '../components/InputCampo'
import Navbar from '../components/Navbar'

export default function CadastroVeiculo() {
  const { id, oficinaId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const editando = !!id
  const [form, setForm] = useState({
    oficina_id: oficinaId ? Number(oficinaId) : null,
    modelo: '', placa: '', cor: '', nome_proprietario: '',
    tipo: 'ASSOCIADO', data_entrada: '', previsao_saida: '',
    data_saida_real: '', observacoes: ''
  })
  const [salvando, setSalvando] = useState(false)
  const [nomeOficina, setNomeOficina] = useState(location.state?.oficina?.nome || '')

  useEffect(() => {
    if (editando) {
      buscarVeiculoPorId(id).then(v => {
        if (v) { setForm({ ...v }); setNomeOficina(v.oficina_nome || '') }
      })
    }
  }, [id])

  const set = (campo) => (e) => setForm(f => ({ ...f, [campo]: e.target.value }))

  const handleSalvar = async () => {
    if (!form.modelo || !form.placa || !form.nome_proprietario) return alert('Modelo, placa e proprietário são obrigatórios.')
    setSalvando(true)
    await salvarVeiculo({ ...form, placa: form.placa.toUpperCase() }, editando ? id : null)
    setSalvando(false)
    navigate(-1)
  }

  return (
    <div className="min-h-dvh bg-primary flex flex-col">
      <Navbar titulo={editando ? 'Editar Veículo' : 'Novo Veículo'} voltar />
      <div className="flex-1 px-4 pt-4 pb-8 overflow-y-auto">
        {nomeOficina && <p className="text-slate-400 text-xs mb-4">📍 {nomeOficina}</p>}
        <InputCampo label="Modelo" obrigatorio placeholder="Ex: Fiat Uno" value={form.modelo} onChange={set('modelo')} />
        <InputCampo label="Placa" obrigatorio placeholder="Ex: ABC1234" value={form.placa} onChange={set('placa')} className="uppercase" maxLength={8} />
        <InputCampo label="Cor" placeholder="Ex: Prata" value={form.cor} onChange={set('cor')} />
        <InputCampo label="Nome do Proprietário" obrigatorio placeholder="Nome completo" value={form.nome_proprietario} onChange={set('nome_proprietario')} />

        <div className="mb-4">
          <label className="block text-slate-400 text-sm font-medium mb-2">Tipo <span className="text-atrasado">*</span></label>
          <div className="flex gap-3">
            {['ASSOCIADO', 'TERCEIRO'].map(t => (
              <button
                key={t}
                onClick={() => setForm(f => ({ ...f, tipo: t }))}
                className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-colors ${
                  form.tipo === t
                    ? t === 'ASSOCIADO' ? 'border-associado bg-associado-bg text-associado' : 'border-terceiro bg-terceiro-bg text-terceiro'
                    : 'border-tertiary bg-secondary text-slate-400'
                }`}
              >
                {t === 'ASSOCIADO' ? '👤 Associado' : '🔑 Terceiro'}
              </button>
            ))}
          </div>
        </div>

        <InputCampo label="Data de Entrada" placeholder="AAAA-MM-DD" type="date" value={form.data_entrada} onChange={set('data_entrada')} />
        <InputCampo label="Previsão de Saída" placeholder="AAAA-MM-DD" type="date" value={form.previsao_saida} onChange={set('previsao_saida')} />
        <InputCampo label="Data Real de Saída" placeholder="AAAA-MM-DD (opcional)" type="date" value={form.data_saida_real} onChange={set('data_saida_real')} />
        <InputCampo label="Observações" placeholder="Notas do vistoriador..." value={form.observacoes} onChange={set('observacoes')} multiline />

        <button
          onClick={handleSalvar}
          disabled={salvando}
          className="w-full bg-accent text-primary font-bold text-base py-4 rounded-2xl mt-2 active:opacity-80 disabled:opacity-50"
          style={{ boxShadow: '0 4px 20px rgba(56,189,248,0.3)' }}
        >
          {salvando ? 'Salvando...' : '💾 Salvar Veículo'}
        </button>
      </div>
    </div>
  )
}
