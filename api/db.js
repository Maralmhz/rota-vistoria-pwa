import { sql } from '@vercel/postgres'

export { sql }

export const calcularStatus = (previsao_saida, data_saida_real) => {
  if (data_saida_real) return 'FINALIZADO'
  if (!previsao_saida) return 'EM_REPARO'
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  const previsao = new Date(previsao_saida + 'T00:00:00')
  return hoje > previsao ? 'ATRASADO' : 'EM_REPARO'
}
