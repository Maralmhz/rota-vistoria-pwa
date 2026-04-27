export const formatarData = (dataISO) => {
  if (!dataISO) return '—'
  const [ano, mes, dia] = dataISO.split('-')
  if (!dia) return '—'
  return `${dia}/${mes}/${ano}`
}

export const gerarNomeArquivo = (prefixo, ext) => {
  const agora = new Date()
  const data = agora.toISOString().split('T')[0]
  const hora = agora.toTimeString().split(' ')[0].replace(/:/g, '-')
  return `${prefixo}_${data}_${hora}.${ext}`
}
