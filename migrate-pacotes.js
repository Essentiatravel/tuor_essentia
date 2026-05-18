const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function migrate() {
  console.log('🔄 Iniciando migração de Pacotes...');

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS pacotes (
        id VARCHAR(255) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        descricao TEXT,
        link VARCHAR(255),
        imagem VARCHAR(255),
        passeios JSONB DEFAULT '[]'::jsonb,
        ativo BOOLEAN DEFAULT true,
        criado_em TIMESTAMP DEFAULT NOW(),
        atualizado_em TIMESTAMP DEFAULT NOW()
      );
    `;

    console.log('📝 Criando tabela pacotes...');
    await client.query(createTableQuery);

    await client.query('COMMIT');
    console.log('✅ Migração de pacotes concluída com sucesso!');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('❌ Erro na migração:', e);
    throw e;
  } finally {
    client.release();
    pool.end();
  }
}

migrate().catch(console.error);
