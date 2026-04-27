import { db } from './database'

const OFICINAS_INICIAIS = [
  {
    nome: 'Martelinho David',
    endereco: 'Av. Barão Homem de Melo, 1439',
    bairro: 'Jardim America',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    cep: '30421-484',
    created_at: new Date().toISOString()
  }
]

export async function popularDadosIniciais() {
  const jaPopulado = localStorage.getItem('rota_seed_v1')
  if (jaPopulado) return

  const total = await db.oficinas.count()
  if (total === 0) {
    await db.oficinas.bulkAdd(OFICINAS_INICIAIS)
    console.log('[Seed] Oficinas populadas com sucesso.')
  }

  localStorage.setItem('rota_seed_v1', 'true')
}
