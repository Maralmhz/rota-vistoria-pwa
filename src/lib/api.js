const BASE = '/api'

// OFICINAS
export const getOficinas = (cidade = null) =>
  fetch(`${BASE}/oficinas${cidade ? `?cidade=${cidade}` : ''}`).then(r => r.json())

export const getOficinaPorId = (id) =>
  fetch(`${BASE}/oficinas?id=${id}`).then(r => r.json())

export const criarOficina = (dados) =>
  fetch(`${BASE}/oficinas`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados) }).then(r => r.json())

export const atualizarOficina = (id, dados) =>
  fetch(`${BASE}/oficinas?id=${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados) }).then(r => r.json())

export const deletarOficina = (id) =>
  fetch(`${BASE}/oficinas?id=${id}`, { method: 'DELETE' }).then(r => r.json())

// VEÍCULOS
export const getVeiculosPorOficina = (oficina_id, busca = '') =>
  fetch(`${BASE}/veiculos?oficina_id=${oficina_id}${busca ? `&busca=${busca}` : ''}`).then(r => r.json())

export const getVeiculosAtrasados = () =>
  fetch(`${BASE}/veiculos?atrasados=true`).then(r => r.json())

export const getVeiculo = (id) =>
  fetch(`${BASE}/veiculos?id=${id}`).then(r => r.json())

export const criarVeiculo = (dados) =>
  fetch(`${BASE}/veiculos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados) }).then(r => r.json())

export const atualizarVeiculo = (id, dados) =>
  fetch(`${BASE}/veiculos?id=${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados) }).then(r => r.json())

export const deletarVeiculo = (id) =>
  fetch(`${BASE}/veiculos?id=${id}`, { method: 'DELETE' }).then(r => r.json())
