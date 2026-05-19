export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const ensureArray = (value: unknown): any[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return [value];
    }
  }
  return [];
};

export async function GET() {
  try {
    console.log('🔄 Buscando pacotes no banco de dados via SQL...');
    const result = await db.query('SELECT * FROM pacotes ORDER BY criado_em DESC');
    const todosPacotes = result.rows;
    console.log(`✅ ${todosPacotes.length} pacotes encontrados no banco`);

    // Format matches for frontend
    const pacotesFormatados = todosPacotes.map((p) => {
      return {
        id: p.id,
        nome: p.nome,
        descricao: p.descricao,
        link: p.link,
        imagem: p.imagem,
        preco: p.preco !== null && p.preco !== undefined ? Number(p.preco) : 0,
        passeios: ensureArray(p.passeios),
        ativo: p.ativo,
        criadoEm: p.criado_em,
        atualizadoEm: p.atualizado_em
      };
    });

    return NextResponse.json(pacotesFormatados);
  } catch (error) {
    console.error('❌ Erro ao buscar pacotes:', error);
    return NextResponse.json({ error: 'Erro ao buscar pacotes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const pacoteData = await request.json();
    console.log('📦 Recebendo dados para criar pacote:', JSON.stringify(pacoteData, null, 2));

    const novoPacoteId = `pacote_${Date.now()}`;
    const nome = pacoteData.nome || "Pacote sem nome";
    const descricao = pacoteData.descricao || "";
    const link = pacoteData.link || "";
    const imagem = pacoteData.imagem || "";
    const preco = parseFloat(pacoteData.preco) || 0;
    const passeios = JSON.stringify(pacoteData.passeios || []);
    const ativo = pacoteData.ativo !== undefined ? pacoteData.ativo : true;

    console.log('📝 Tentando inserir pacote no banco:', {
      id: novoPacoteId, nome, link, preco
    });

    const insertQuery = `
      INSERT INTO pacotes 
      (id, nome, descricao, link, imagem, preco, passeios, ativo, criado_em, atualizado_em)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
      RETURNING *
    `;

    const result = await db.query(insertQuery, [
      novoPacoteId,
      nome,
      descricao,
      link,
      imagem,
      preco,
      passeios,
      ativo
    ]);

    console.log('✅ Inserção de pacote com sucesso. Rows:', result.rowCount);
    const novoPacote = result.rows[0];

    return NextResponse.json({
      id: novoPacote.id,
      message: 'Pacote criado com sucesso',
      pacote: {
        ...novoPacote,
        preco: novoPacote.preco !== null && novoPacote.preco !== undefined ? Number(novoPacote.preco) : 0,
        criadoEm: novoPacote.criado_em,
        atualizadoEm: novoPacote.atualizado_em,
        passeios: ensureArray(novoPacote.passeios)
      }
    });
  } catch (error) {
    console.error('❌ Erro CRÍTICO ao criar pacote:', error);
    return NextResponse.json({ error: 'Erro interno do servidor', details: String(error) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const pacoteData = await request.json();
    const { id, nome, descricao, link, imagem, preco, passeios, ativo } = pacoteData;
    
    if (!id) {
      return NextResponse.json({ error: 'ID do pacote é obrigatório' }, { status: 400 });
    }

    const updateQuery = `
      UPDATE pacotes
      SET nome = $1, descricao = $2, link = $3, imagem = $4, preco = $5, passeios = $6, ativo = $7, atualizado_em = NOW()
      WHERE id = $8
      RETURNING *
    `;

    const result = await db.query(updateQuery, [
      nome,
      descricao,
      link,
      imagem,
      parseFloat(preco) || 0,
      JSON.stringify(passeios || []),
      ativo !== undefined ? ativo : true,
      id
    ]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Pacote não encontrado' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Pacote atualizado com sucesso',
      pacote: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Erro ao atualizar pacote:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID do pacote é obrigatório' }, { status: 400 });
    }

    const result = await db.query('DELETE FROM pacotes WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Pacote não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Pacote excluído com sucesso' });
  } catch (error) {
    console.error('❌ Erro ao excluir pacote:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
