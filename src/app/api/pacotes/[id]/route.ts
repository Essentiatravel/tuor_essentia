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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'ID do pacote é obrigatório' }, { status: 400 });
    }

    const result = await db.query('SELECT * FROM pacotes WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Pacote não encontrado' }, { status: 404 });
    }

    const p = result.rows[0];
    const pacoteFormatado = {
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

    return NextResponse.json(pacoteFormatado);
  } catch (error) {
    console.error('❌ Erro ao buscar pacote:', error);
    return NextResponse.json({ error: 'Erro ao buscar pacote' }, { status: 500 });
  }
}
