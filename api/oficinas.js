import { sql } from '@vercel/postgres'

export default async function handler(req, res) {
  const { method } = req

  try {
    if (method === 'GET') {
      const { cidade } = req.query
      const rows = cidade
        ? (await sql`SELECT * FROM oficinas WHERE cidade = ${cidade} ORDER BY nome`).rows
        : (await sql`SELECT * FROM oficinas ORDER BY nome`).rows

      // Conta veículos por oficina
      for (const o of rows) {
        const v = (await sql`SELECT status FROM veiculos WHERE oficina_id = ${o.id}`).rows
        o.total_veiculos = v.length
        o.total_atrasados = v.filter(x => x.status === 'ATRASADO').length
        o.total_em_reparo = v.filter(x => x.status === 'EM_REPARO').length
        o.total_finalizados = v.filter(x => x.status === 'FINALIZADO').length
      }
      return res.status(200).json(rows)
    }

    if (method === 'POST') {
      const { nome, endereco, bairro, cidade, estado, cep, telefone } = req.body
      const result = await sql`
        INSERT INTO oficinas (nome, endereco, bairro, cidade, estado, cep, telefone)
        VALUES (${nome}, ${endereco}, ${bairro}, ${cidade}, ${estado}, ${cep}, ${telefone})
        RETURNING *
      `
      return res.status(201).json(result.rows[0])
    }

    if (method === 'PUT') {
      const { id } = req.query
      const { nome, endereco, bairro, cidade, estado, cep, telefone } = req.body
      const result = await sql`
        UPDATE oficinas SET nome=${nome}, endereco=${endereco}, bairro=${bairro},
          cidade=${cidade}, estado=${estado}, cep=${cep}, telefone=${telefone}
        WHERE id=${id} RETURNING *
      `
      return res.status(200).json(result.rows[0])
    }

    if (method === 'DELETE') {
      const { id } = req.query
      await sql`DELETE FROM oficinas WHERE id=${id}`
      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: err.message })
  }
}
