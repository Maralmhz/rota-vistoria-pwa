import { sql } from '@vercel/postgres'

const recalcularStatus = async (id) => {
  const v = (await sql`SELECT previsao_saida, data_saida_real FROM veiculos WHERE id=${id}`).rows[0]
  if (!v) return
  let status = 'EM_REPARO'
  if (v.data_saida_real) status = 'FINALIZADO'
  else if (v.previsao_saida && new Date() > new Date(v.previsao_saida)) status = 'ATRASADO'
  await sql`UPDATE veiculos SET status=${status}, updated_at=NOW() WHERE id=${id}`
}

export default async function handler(req, res) {
  const { method } = req

  try {
    if (method === 'GET') {
      const { oficina_id, busca, atrasados } = req.query

      if (atrasados === 'true') {
        const hoje = new Date().toISOString().split('T')[0]
        const rows = (await sql`
          SELECT v.*, o.nome as oficina_nome, o.cidade as oficina_cidade
          FROM veiculos v JOIN oficinas o ON o.id = v.oficina_id
          WHERE v.data_saida_real IS NULL AND v.previsao_saida < ${hoje}
          ORDER BY v.previsao_saida ASC
        `).rows
        return res.status(200).json(rows)
      }

      if (oficina_id) {
        let rows = (await sql`SELECT * FROM veiculos WHERE oficina_id=${oficina_id} ORDER BY created_at DESC`).rows
        if (busca) {
          const b = busca.toLowerCase()
          rows = rows.filter(v => v.placa?.toLowerCase().includes(b) || v.nome_proprietario?.toLowerCase().includes(b))
        }
        return res.status(200).json(rows)
      }

      const rows = (await sql`SELECT v.*, o.nome as oficina_nome FROM veiculos v JOIN oficinas o ON o.id = v.oficina_id ORDER BY v.created_at DESC`).rows
      return res.status(200).json(rows)
    }

    if (method === 'POST') {
      const { oficina_id, modelo, placa, nome_proprietario, tipo, previsao_saida, observacoes } = req.body
      const result = await sql`
        INSERT INTO veiculos (oficina_id, modelo, placa, nome_proprietario, tipo, previsao_saida, observacoes)
        VALUES (${oficina_id}, ${modelo}, ${placa}, ${nome_proprietario}, ${tipo}, ${previsao_saida || null}, ${observacoes})
        RETURNING *
      `
      const id = result.rows[0].id
      await recalcularStatus(id)
      const updated = (await sql`SELECT * FROM veiculos WHERE id=${id}`).rows[0]
      return res.status(201).json(updated)
    }

    if (method === 'PUT') {
      const { id } = req.query
      const { modelo, placa, nome_proprietario, tipo, previsao_saida, data_saida_real, observacoes } = req.body
      await sql`
        UPDATE veiculos SET
          modelo=${modelo}, placa=${placa}, nome_proprietario=${nome_proprietario},
          tipo=${tipo}, previsao_saida=${previsao_saida || null},
          data_saida_real=${data_saida_real || null}, observacoes=${observacoes},
          updated_at=NOW()
        WHERE id=${id}
      `
      await recalcularStatus(id)
      const updated = (await sql`SELECT * FROM veiculos WHERE id=${id}`).rows[0]
      return res.status(200).json(updated)
    }

    if (method === 'DELETE') {
      const { id } = req.query
      await sql`DELETE FROM veiculos WHERE id=${id}`
      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: err.message })
  }
}
