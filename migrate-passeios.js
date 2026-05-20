const { Pool } = require('pg');

// Use environment variables or fallback to defaults
const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function migrate() {
  console.log('🔄 Iniciando migração da tabela Passeios...');

  const client = await pool.connect();
  try {
    // Verificar se a tabela existe
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'passeios'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      console.log('📝 Tabela passeios não existe. Criando...');
      await client.query(`
        CREATE TABLE public.passeios (
            id character varying NOT NULL PRIMARY KEY,
            nome character varying NOT NULL,
            descricao text NOT NULL,
            preco real NOT NULL,
            duracao character varying NOT NULL,
            categoria character varying NOT NULL,
            imagens jsonb DEFAULT '[]'::jsonb,
            inclusoes jsonb DEFAULT '[]'::jsonb,
            idiomas jsonb DEFAULT '[]'::jsonb,
            capacidade_maxima integer DEFAULT 20,
            ativo integer DEFAULT 1,
            criado_em timestamp without time zone DEFAULT now(),
            atualizado_em timestamp without time zone DEFAULT now()
        );
      `);
    }

    console.log('📝 Verificando e adicionando colunas faltantes...');

    const columnsToAdd = [
      { name: 'tarifa_2_pessoas', type: 'real' },
      { name: 'tarifa_4_pessoas', type: 'real' },
      { name: 'tarifa_6_pessoas', type: 'real' },
      { name: 'tarifa_8_pessoas', type: 'real' },
      { name: 'tarifa_10_pessoas', type: 'real' },
      { name: 'sob_consulta_texto', type: 'text' },
      { name: 'preco_real', type: 'real' }
    ];

    for (const col of columnsToAdd) {
      const colCheck = await client.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name='passeios' AND column_name='${col.name}';
      `);

      if (colCheck.rowCount === 0) {
        console.log(`➕ Adicionando coluna: ${col.name}`);
        await client.query(`ALTER TABLE passeios ADD COLUMN ${col.name} ${col.type};`);
      } else {
        console.log(`✅ Coluna ${col.name} já existe.`);
      }
    }

    console.log('✅ Migração de passeios concluída com sucesso!');
  } catch (e) {
    console.error('❌ Erro na migração:', e);
  } finally {
    client.release();
    pool.end();
  }
}

migrate().catch(console.error);
