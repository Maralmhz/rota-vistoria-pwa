import React from 'react'

export default function BotaoFlutuante({ onClick, icone = '+', cor = 'bg-accent' }) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-5 w-14 h-14 ${cor} rounded-full shadow-2xl flex items-center justify-center text-3xl font-bold text-primary z-50 active:scale-90 transition-transform`}
      style={{ boxShadow: '0 4px 24px rgba(56,189,248,0.4)' }}
    >
      {icone}
    </button>
  )
}
