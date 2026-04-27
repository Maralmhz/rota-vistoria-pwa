-- Rota Vistoria — Schema PostgreSQL
-- Execute via: POST /api/setup

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
);

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
);

CREATE INDEX IF NOT EXISTS idx_veiculos_oficina ON veiculos(oficina_id);
CREATE INDEX IF NOT EXISTS idx_veiculos_status ON veiculos(status);
CREATE INDEX IF NOT EXISTS idx_veiculos_previsao ON veiculos(previsao_saida);
