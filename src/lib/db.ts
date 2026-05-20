import { Pool } from 'pg';

const isBuildTime = process.env.SKIP_DB_CHECK === 'true';

const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === 'true'
        ? { rejectUnauthorized: false }
        : false,
    connectionTimeoutMillis: 10000, // 10s
    idleTimeoutMillis: 30000,
});

pool.on('error', (err) => {
    if (!isBuildTime) {
        console.error('❌ Unexpected error on idle database client:', err.message);
    }
});

if (!isBuildTime) {
    console.log(`🔌 DB Connection Target: ${process.env.DB_HOST}:${process.env.DB_PORT} - DB: ${process.env.DB_NAME}`);
    if (!process.env.DB_HOST) {
        console.error('❌ CRITICAL: DB_HOST is not defined in environment variables!');
    }
}

let columnsChecked = false;

export const db = {
    query: (text: string, params?: any[]) => {
        // console.log('SQL:', text.slice(0, 100).replace(/\n/g, ' '));
        return pool.query(text, params);
    },
    ensurePasseiosColumnsExist: async () => {
        if (columnsChecked || isBuildTime) return;
        try {
            const columnsToAdd = [
                { name: 'tarifa_2_pessoas', type: 'real' },
                { name: 'tarifa_4_pessoas', type: 'real' },
                { name: 'tarifa_6_pessoas', type: 'real' },
                { name: 'tarifa_8_pessoas', type: 'real' },
                { name: 'tarifa_10_pessoas', type: 'real' },
                { name: 'sob_consulta_texto', type: 'text' },
                { name: 'preco_real', type: 'real' },
                { name: 'desconto_grupo', type: 'real' }
            ];

            for (const col of columnsToAdd) {
                try {
                    const colCheck = await pool.query(`
                        SELECT column_name 
                        FROM information_schema.columns 
                        WHERE table_name='passeios' AND column_name=$1;
                    `, [col.name]);

                    if (colCheck.rowCount === 0) {
                        console.log(`➕ Auto-migration: Adding column ${col.name} to passeios table`);
                        await pool.query(`ALTER TABLE passeios ADD COLUMN ${col.name} ${col.type};`);
                    }
                } catch (colError) {
                    console.error(`❌ Auto-migration error for column ${col.name}:`, colError);
                }
            }
            columnsChecked = true;
            console.log('✅ Auto-migration check completed for passeios table.');
        } catch (err) {
            console.error('❌ Auto-migration critical failure:', err);
        }
    }
};

export default pool;
