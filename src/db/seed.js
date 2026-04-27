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
  },
  {
    nome: 'FastCar',
    endereco: 'Av. Régulus, 248',
    bairro: 'Jardim Riacho das Pedras',
    cidade: 'Contagem',
    estado: 'MG',
    cep: '32241-210',
    created_at: new Date().toISOString()
  },
  {
    nome: 'Oficina MCar',
    endereco: 'Rua Nadir Avelino, 10',
    bairro: 'Eldorado',
    cidade: 'Contagem',
    estado: 'MG',
    cep: '32310-475',
    created_at: new Date().toISOString()
  },
  {
    nome: 'Volpini',
    endereco: 'Rua D, 101',
    bairro: 'Inconfidentes',
    cidade: 'Contagem',
    estado: 'MG',
    cep: '32260-630',
    created_at: new Date().toISOString()
  },
  {
    nome: 'Cargil Centro Automotivo',
    endereco: 'R. Cel. Augusto Camargos, 883',
    bairro: 'Centro',
    cidade: 'Contagem',
    estado: 'MG',
    cep: '32015-740',
    created_at: new Date().toISOString()
  },
  {
    nome: 'Quality Car Lanternagem e Pintura',
    endereco: 'Avenida Tapajós, 951',
    bairro: 'São Luiz',
    cidade: 'Betim',
    estado: 'MG',
    cep: '32676-655',
    created_at: new Date().toISOString()
  },
  {
    nome: 'Oficina VR Vanderley Neves Justinópolis',
    endereco: 'R. Antônio Teixeira Leite, 100',
    bairro: 'Papine (Justinópolis)',
    cidade: 'Ribeirão das Neves',
    estado: 'MG',
    cep: '33900-640',
    created_at: new Date().toISOString()
  }
]

export async function popularDadosIniciais() {
  const jaPopulado = localStorage.getItem('rota_seed_v2')
  if (jaPopulado) return

  const total = await db.oficinas.count()
  if (total === 0) {
    await db.oficinas.bulkAdd(OFICINAS_INICIAIS)
    console.log('[Seed] Oficinas populadas com sucesso.')
  }

  localStorage.setItem('rota_seed_v2', 'true')
}
