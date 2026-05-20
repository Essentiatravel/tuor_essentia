export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    console.log('🔄 Iniciando migração manual de Passeios via API...');

    // Verificando e adicionando colunas faltantes
    const columnsToAdd = [
      { name: 'tarifa_2_pessoas', type: 'real' },
      { name: 'tarifa_4_pessoas', type: 'real' },
      { name: 'tarifa_6_pessoas', type: 'real' },
      { name: 'tarifa_8_pessoas', type: 'real' },
      { name: 'tarifa_10_pessoas', type: 'real' },
      { name: 'sob_consulta_texto', type: 'text' },
      { name: 'preco_real', type: 'real' }
    ];

    const results = [];

    for (const col of columnsToAdd) {
      try {
        // Verificar se a coluna existe
        const colCheck = await db.query(`
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_name='passeios' AND column_name=$1;
        `, [col.name]);

        if (colCheck.rowCount === 0) {
          console.log(`➕ Adicionando coluna: ${col.name}`);
          await db.query(`ALTER TABLE passeios ADD COLUMN ${col.name} ${col.type};`);
          results.push({ column: col.name, status: 'added' });
        } else {
          results.push({ column: col.name, status: 'already_exists' });
        }
      } catch (colError) {
        console.error(`❌ Erro ao processar coluna ${col.name}:`, colError);
        results.push({ column: col.name, status: 'error', error: String(colError) });
      }
    }

    return NextResponse.json({ 
      message: 'Processo de migração concluído', 
      results 
    });
  } catch (error) {
    console.error('❌ Erro geral na migração:', error);
    return NextResponse.json({ 
      error: 'Erro na migração', 
      details: String(error) 
    }, { status: 500 });
  }
}
