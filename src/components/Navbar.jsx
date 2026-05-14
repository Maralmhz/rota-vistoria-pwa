import React from 'react'
import { useNavigate } from 'react-router-dom'
import logoUrl from '../../logo.png'

export default function Navbar({ voltar, acoes }) {
  const navigate = useNavigate()
  return (
    <header className="bg-secondary border-b border-tertiary flex items-center justify-center sticky top-0 z-50" style={{ padding: '8px 16px', minHeight: 0 }}>
      {voltar && (
        <button onClick={() => navigate(-1)} className="absolute left-4 text-accent text-xl w-8 h-8 flex items-center justify-center rounded-full active:bg-tertiary">
          ←
        </button>
      )}
      <img
        src={logoUrl}
        alt="Rota Vistoria"
        style={{ height: '72px', width: 'auto', objectFit: 'contain', display: 'block' }}
      />
      {acoes && <div className="absolute right-4 flex gap-2">{acoes}</div>}
    </header>
  )
}
