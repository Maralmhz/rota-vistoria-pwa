import React from 'react'
import { useNavigate } from 'react-router-dom'
import logoUrl from '../../logo.png'

export default function Navbar({ titulo, voltar, acoes }) {
  const navigate = useNavigate()
  return (
    <header className="bg-secondary border-b border-tertiary px-4 py-3 flex items-center sticky top-0 z-50">
      {voltar ? (
        <button onClick={() => navigate(-1)} className="text-accent text-xl w-8 h-8 flex items-center justify-center rounded-full active:bg-tertiary mr-2">
          ←
        </button>
      ) : null}
      <div className="flex-1 flex justify-center">
        <img
          src={logoUrl}
          alt="Rota Vistoria"
          className="h-12 w-auto object-contain"
        />
      </div>
      {acoes && <div className="flex gap-2">{acoes}</div>}
    </header>
  )
}
