import { getOficinas, getVeiculosPorOficina, getVeiculosAtrasados, criarOficina, criarVeiculo } from '../lib/api'
import { formatarData, gerarNomeArquivo } from './formatadores'

const formatarVeiculo = (v) =>
  `  - MODELO: ${v.modelo}\n    PLACA: ${v.placa}\n    COR: ${v.cor || 'Não informado'}\n    PROPRIETÁRIO: ${v.nome_proprietario}\n    TIPO: ${v.tipo}\n    ENTRADA: ${formatarData(v.data_entrada)}\n    PREVISÃO: ${formatarData(v.previsao_saida)}\n    REAL: ${v.data_saida_real ? formatarData(v.data_saida_real) : 'Pendente'}\n    STATUS: ${v.status}\n    OBS: ${v.observacoes || '-'}`

const formatarOficina = (o, veiculos) => {
  const cab = `📍 OFICINA: ${o.nome}\nENDEREÇO: ${o.endereco}\nCIDADE: ${o.cidade} - ${o.estado}\nTOTAL: ${veiculos.length} veículo(s)`
  if (veiculos.length === 0) return cab + '\n\nNenhum veículo cadastrado.\n'
  return `${cab}\n\nVEÍCULOS:\n${veiculos.map(formatarVeiculo).join('\n\n')}\n`
}

const compartilharOuDownload = (texto, nomeArquivo) => {
  if (navigator.share) {
    navigator.share({ title: 'Rota Vistoria', text: texto }).catch(() => {})
  } else {
    const blob = new Blob([texto], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = nomeArquivo; a.click()
    URL.revokeObjectURL(url)
  }
}

export const exportarOficina = async (oficina) => {
    const veiculos = await getVeiculosPorOficina(oficina.id)
  const texto = `🚗 ROTA VISTORIA — ${new Date().toLocaleString('pt-BR')}\n\n${formatarOficina(oficina, veiculos)}`
  compartilharOuDownload(texto, `oficina_${oficina.nome}.txt`)
}

export const exportarTodasOficinas = async () => {
    const oficinas = await getOficinas()
  let texto = `🚗 ROTA VISTORIA — Todas as Oficinas\nData: ${new Date().toLocaleString('pt-BR')}\n${'═'.repeat(40)}\n\n`
  for (const o of oficinas) {
        const veiculos = await getVeiculosPorOficina(o.id)
    texto += formatarOficina(o, veiculos) + '\n' + '─'.repeat(40) + '\n\n'
  }
  texto += `Total de oficinas: ${oficinas.length}`
  compartilharOuDownload(texto, 'todas_oficinas.txt')
}

export const exportarAtrasados = async () => {
    const veiculos = await getVeiculosAtrasados()
  let texto = `⚠️ ROTA VISTORIA — Veículos Atrasados\nData: ${new Date().toLocaleString('pt-BR')}\n${'═'.repeat(40)}\n\n`
  texto += veiculos.length === 0 ? 'Nenhum veículo atrasado. ✅' : `Total: ${veiculos.length}\n\n` + veiculos.map(v => `📍 ${v.oficina_nome} (${v.oficina_cidade})\n${formatarVeiculo(v)}`).join('\n\n')
  compartilharOuDownload(texto, 'atrasados.txt')
}

export const exportarBackup = async () => {
    const oficinas = await getOficinas()
    const veiculosArr = await Promise.all(oficinas.map(o => getVeiculosPorOficina(o.id))); const veiculos = veiculosArr.flat()
  const backup = { versao: '1.0', data: new Date().toISOString(), app: 'ROTA VISTORIA', oficinas, veiculos }
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = gerarNomeArquivo('backup_RotaVistoria', 'json'); a.click()
  URL.revokeObjectURL(url)
  if (navigator.share) {
    const file = new File([blob], gerarNomeArquivo('backup_RotaVistoria', 'json'), { type: 'application/json' })
    if (navigator.canShare?.({ files: [file] })) navigator.share({ files: [file], title: 'Backup Rota Vistoria' }).catch(() => {})
  }
  return { totalOficinas: oficinas.length, totalVeiculos: veiculos.length }
}

export const importarBackup = async (arquivo) => {
  const texto = await arquivo.text()
  let backup
  try { backup = JSON.parse(texto) } catch { throw new Error('Arquivo inválido') }
  if (!backup.oficinas || !backup.veiculos) throw new Error('Formato inválido')
    for (const o of backup.oficinas) { const nova = await criarOficina(o); for (const v of backup.veiculos.filter(v => v.oficina_id === o.id)) { await criarVeiculo({ ...v, oficina_id: nova.id }) } }
    // importação concluída via API
    
    
  return { totalOficinas: backup.oficinas.length, totalVeiculos: backup.veiculos.length }
}
