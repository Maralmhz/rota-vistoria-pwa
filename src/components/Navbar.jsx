import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ titulo, voltar, acoes }) {
  const navigate = useNavigate()
  return (
    <header className="bg-secondary border-b border-tertiary px-4 py-3 flex items-center gap-3 sticky top-0 z-50">
      {voltar && (
        <button onClick={() => navigate(-1)} className="text-accent text-xl w-8 h-8 flex items-center justify-center rounded-full active:bg-tertiary">
          ←
        </button>
      )}
      <h1 className="text-white font-bold text-lg flex-1 truncate">{titulo}</h1>
      {acoes && <div className="flex gap-2">{acoes}</div>}
    </header>
  )
}
