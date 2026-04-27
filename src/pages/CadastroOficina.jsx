import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { buscarOficinaPorId, salvarOficina } from '../db/database'
import InputCampo from '../components/InputCampo'
import Navbar from '../components/Navbar'

export default function CadastroOficina() {
  const { id } = useParams()
  const navigate = useNavigate()
  const editando = id && id !== 'nova'
  const [form, setForm] = useState({ nome: '', endereco: '', cidade: '', estado: '' })
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    if (editando) buscarOficinaPorId(id).then(o => o && setForm({ nome: o.nome, endereco: o.endereco, cidade: o.cidade, estado: o.estado }))
  }, [id])

  const set = (campo) => (e) => setForm(f => ({ ...f, [campo]: e.target.value }))

  const handleSalvar = async () => {
    if (!form.nome || !form.endereco || !form.cidade || !form.estado) return alert('Preencha todos os campos obrigatórios.')
    setSalvando(true)
    await salvarOficina({ ...form, estado: form.estado.toUpperCase() }, editando ? id : null)
    setSalvando(false)
    navigate(-1)
  }

  return (
    <div className="min-h-dvh bg-primary flex flex-col">
      <Navbar titulo={editando ? 'Editar Oficina' : 'Nova Oficina'} voltar />
      <div className="flex-1 px-4 pt-4 pb-8 overflow-y-auto">
        <InputCampo label="Nome da Oficina" obrigatorio placeholder="Ex: Auto Center Silva" value={form.nome} onChange={set('nome')} />
        <InputCampo label="Endereço" obrigatorio placeholder="Ex: Rua das Flores, 123" value={form.endereco} onChange={set('endereco')} />
        <InputCampo label="Cidade" obrigatorio placeholder="Ex: Belo Horizonte" value={form.cidade} onChange={set('cidade')} />
        <InputCampo label="Estado" obrigatorio placeholder="Ex: MG" value={form.estado} onChange={set('estado')} maxLength={2} className="uppercase" />
        <button
          onClick={handleSalvar}
          disabled={salvando}
          className="w-full bg-accent text-primary font-bold text-base py-4 rounded-2xl mt-2 active:opacity-80 disabled:opacity-50 transition-opacity"
          style={{ boxShadow: '0 4px 20px rgba(56,189,248,0.3)' }}
        >
          {salvando ? 'Salvando...' : '💾 Salvar Oficina'}
        </button>
      </div>
    </div>
  )
}
