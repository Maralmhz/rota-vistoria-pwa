import Dexie from 'dexie'

export const db = new Dexie('RotaVistoria')

db.version(1).stores({
  oficinas: '++id, nome, cidade, estado, created_at',
  veiculos: '++id, oficina_id, modelo, placa, nome_proprietario, tipo, status, previsao_saida, data_saida_real, created_at'
})

export const calcularStatus = (previsao_saida, data_saida_real) => {
  if (data_saida_real) return 'FINALIZADO'
  if (!previsao_saida) return 'EM_REPARO'
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  const previsao = new Date(previsao_saida + 'T00:00:00')
  return hoje > previsao ? 'ATRASADO' : 'EM_REPARO'
}

// OFICINAS
export const buscarTodasOficinas = async (cidadeFiltro = null) => {
  let lista = cidadeFiltro
    ? await db.oficinas.where('cidade').equals(cidadeFiltro).toArray()
    : await db.oficinas.orderBy('nome').toArray()
  for (const o of lista) {
    const veiculos = await db.veiculos.where('oficina_id').equals(o.id).toArray()
    o.total_veiculos = veiculos.length
    o.total_atrasados = veiculos.filter(v => calcularStatus(v.previsao_saida, v.data_saida_real) === 'ATRASADO').length
    o.total_em_reparo = veiculos.filter(v => calcularStatus(v.previsao_saida, v.data_saida_real) === 'EM_REPARO').length
    o.total_finalizados = veiculos.filter(v => calcularStatus(v.previsao_saida, v.data_saida_real) === 'FINALIZADO').length
  }
  return lista
}

export const buscarOficinaPorId = async (id) => db.oficinas.get(Number(id))

export const salvarOficina = async (dados, id = null) => {
  if (id) { await db.oficinas.update(Number(id), dados); return Number(id) }
  return db.oficinas.add({ ...dados, created_at: new Date().toISOString() })
}

export const removerOficina = async (id) => {
  await db.veiculos.where('oficina_id').equals(Number(id)).delete()
  await db.oficinas.delete(Number(id))
}

export const buscarCidades = async () => {
  const todas = await db.oficinas.orderBy('cidade').toArray()
  return [...new Set(todas.map(o => o.cidade))]
}

// VEICULOS
export const buscarVeiculosPorOficina = async (oficinaId, busca = '') => {
  let lista = await db.veiculos.where('oficina_id').equals(Number(oficinaId)).toArray()
  if (busca) {
    const b = busca.toLowerCase()
    lista = lista.filter(v => v.placa?.toLowerCase().includes(b) || v.nome_proprietario?.toLowerCase().includes(b))
  }
  return lista.map(v => ({ ...v, status: calcularStatus(v.previsao_saida, v.data_saida_real) }))
}

export const buscarVeiculoPorId = async (id) => {
  const v = await db.veiculos.get(Number(id))
  if (!v) return null
  const o = await db.oficinas.get(v.oficina_id)
  return { ...v, status: calcularStatus(v.previsao_saida, v.data_saida_real), oficina_nome: o?.nome }
}

export const buscarVeiculosAtrasados = async () => {
  const hoje = new Date().toISOString().split('T')[0]
  const lista = await db.veiculos.filter(v => !v.data_saida_real && v.previsao_saida < hoje).toArray()
  const result = []
  for (const v of lista) {
    const o = await db.oficinas.get(v.oficina_id)
    result.push({ ...v, status: 'ATRASADO', oficina_nome: o?.nome, oficina_cidade: o?.cidade })
  }
  return result
}

export const salvarVeiculo = async (dados, id = null) => {
  const status = calcularStatus(dados.previsao_saida, dados.data_saida_real)
  if (id) { await db.veiculos.update(Number(id), { ...dados, status, updated_at: new Date().toISOString() }); return Number(id) }
  return db.veiculos.add({ ...dados, status, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
}

export const removerVeiculo = async (id) => db.veiculos.delete(Number(id))
