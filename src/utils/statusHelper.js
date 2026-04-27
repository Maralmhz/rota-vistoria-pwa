export const corDoStatus = (status) => {
  switch (status) {
    case 'FINALIZADO': return 'text-finalizado'
    case 'ATRASADO': return 'text-atrasado'
    default: return 'text-em-reparo'
  }
}

export const fundoBadgeStatus = (status) => {
  switch (status) {
    case 'FINALIZADO': return 'bg-finalizado-bg text-finalizado'
    case 'ATRASADO': return 'bg-atrasado-bg text-atrasado'
    default: return 'bg-em-reparo-bg text-em-reparo'
  }
}

export const bordaStatus = (status) => {
  switch (status) {
    case 'FINALIZADO': return 'border-finalizado'
    case 'ATRASADO': return 'border-atrasado'
    default: return 'border-em-reparo'
  }
}

export const textoDoStatus = (status) => {
  switch (status) {
    case 'FINALIZADO': return '✅ Finalizado'
    case 'ATRASADO': return '⚠️ Atrasado'
    default: return '🔧 Em Reparo'
  }
}
