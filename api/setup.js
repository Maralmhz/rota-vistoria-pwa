import { sql } from '@vercel/postgres'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS oficinas (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        endereco VARCHAR(255),
        bairro VARCHAR(255),
        cidade VARCHAR(255),
        estado VARCHAR(2),
        cep VARCHAR(20),
        telefone VARCHAR(30),
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS veiculos (
        id SERIAL PRIMARY KEY,
        oficina_id INTEGER REFERENCES oficinas(id) ON DELETE CASCADE,
        modelo VARCHAR(255),
        placa VARCHAR(20),
        nome_proprietario VARCHAR(255),
        tipo VARCHAR(100),
        status VARCHAR(50) DEFAULT 'EM_REPARO',
        previsao_saida DATE,
        data_saida_real DATE,
        observacoes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    // Seed das oficinas parceiras
    await sql`
      INSERT INTO oficinas (nome, endereco, bairro, cidade, estado, cep)
      VALUES
        ('Martelinho David', 'Av. Barão Homem de Melo, 1439', 'Jardim America', 'Belo Horizonte', 'MG', '30421-484'),
        ('FastCar', 'Av. Régulus, 248', 'Jardim Riacho das Pedras', 'Contagem', 'MG', '32241-210'),
        ('Oficina MCar', 'Rua Nadir Avelino, 10', 'Eldorado', 'Contagem', 'MG', '32310-475'),
        ('Volpini', 'Rua D, 101', 'Inconfidentes', 'Contagem', 'MG', '32260-630'),
        ('Cargil Centro Automotivo', 'R. Cel. Augusto Camargos, 883', 'Centro', 'Contagem', 'MG', '32015-740'),
        ('Quality Car Lanternagem e Pintura', 'Avenida Tapajós, 951', 'São Luiz', 'Betim', 'MG', '32676-655'),
        ('Oficina VR Vanderley Neves Justinópolis', 'R. Antônio Teixeira Leite, 100', 'Papine (Justinópolis)', 'Ribeirão das Neves', 'MG', '33900-640')
      ON CONFLICT DO NOTHING
    `

    return res.status(200).json({ ok: true, message: 'Banco criado e populado com sucesso!' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: err.message })
  }
}
