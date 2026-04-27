import React from 'react'

export default function InputCampo({ label, obrigatorio, multiline, className, ...props }) {
  const base = "w-full bg-primary border border-tertiary rounded-xl px-4 py-3 text-white placeholder-slate-600 text-base focus:outline-none focus:border-accent transition-colors"
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-slate-400 text-sm font-medium mb-1.5">
          {label}{obrigatorio && <span className="text-atrasado ml-0.5">*</span>}
        </label>
      )}
      {multiline
        ? <textarea className={`${base} min-h-[100px] resize-none ${className || ''}`} {...props} />
        : <input className={`${base} ${className || ''}`} {...props} />}
    </div>
  )
}
