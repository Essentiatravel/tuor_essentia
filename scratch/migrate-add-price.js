const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Helper to load env files manually
function loadEnv() {
  const envPaths = [
    path.join(__dirname, '../.env.local'),
    path.join(__dirname, '../.env')
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      console.log(`💡 Carregando variáveis de ambiente de: ${envPath}`);
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let value = match[2] || '';
          // Remove wrapping quotes if any
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
          } else if (value.startsWith("'") && value.endsWith("'")) {
            value = value.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = value.trim();
          }
        }
      });
    }
  }
}

loadEnv();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function run() {
  console.log('🔄 Iniciando migração para adicionar a coluna "preco" em "pacotes"...');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Add columns preco IF NOT EXISTS
    const alterQuery = `
      ALTER TABLE pacotes 
      ADD COLUMN IF NOT EXISTS preco NUMERIC(10, 2) DEFAULT 0.00;
    `;
    
    console.log('📝 Executando ALTER TABLE pacotes...');
    await client.query(alterQuery);
    
    await client.query('COMMIT');
    console.log('✅ Coluna "preco" adicionada com sucesso ou já existente!');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('❌ Erro na migração:', e);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch(console.error);
