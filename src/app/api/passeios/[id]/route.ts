export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const ensureArray = (value: unknown): string[] => {
  if (!value && value !== 0) return [];
  // Handle already parsed arrays (pg driver behavior for jsonb)
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string').map(i => i.trim()).filter(Boolean);
  }
  // Handle stringified JSON
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === 'string').map(i => i.trim()).filter(Boolean);
      }
      return [value.trim()].filter(Boolean);
    } catch {
      return [value.trim()].filter(Boolean);
    }
  }
  return [];
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await db.ensurePasseiosColumnsExist();
    const { id } = await params;
    console.log('🔍 Buscando passeio no banco via SQL:', id);

    const result = await db.query('SELECT * FROM passeios WHERE id = $1', [id]);
    const passeio = result.rows[0];

    if (!passeio) {
      console.log('❌ Passeio não encontrado:', id);
      return NextResponse.json({ error: 'Passeio não encontrado' }, { status: 404 });
    }

    const precoFinal = (passeio.preco_real !== null && passeio.preco_real !== undefined) ? passeio.preco_real : (passeio.preco || 0);

    const passeioFormatado = {
      id: passeio.id,
      nome: passeio.nome,
      descricao: passeio.descricao,
      preco: precoFinal,
      duracao: passeio.duracao,
      categoria: passeio.categoria,
      imagens: ensureArray(passeio.imagens),
      images: ensureArray(passeio.imagens), // Alias
      inclusoes: ensureArray(passeio.inclusoes),
      idiomas: ensureArray(passeio.idiomas),
      capacidadeMaxima: passeio.capacidade_maxima,
      tarifa2Pessoas: passeio.tarifa_2_pessoas,
      tarifa4Pessoas: passeio.tarifa_4_pessoas,
      tarifa6Pessoas: passeio.tarifa_6_pessoas,
      tarifa8Pessoas: passeio.tarifa_8_pessoas,
      tarifa10Pessoas: passeio.tarifa_10_pessoas,
      sobConsultaTexto: passeio.sob_consulta_texto,
      descontoGrupo: passeio.desconto_grupo,
      ativo: passeio.ativo,
      criadoEm: passeio.criado_em,
      atualizadoEm: passeio.atualizado_em
    };

    return NextResponse.json(passeioFormatado);
  } catch (error) {
    console.error('❌ Erro ao buscar passeio:', error);
    return NextResponse.json({ error: 'Erro ao buscar passeio' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await db.ensurePasseiosColumnsExist();
    const { id } = await params;
    const passeioData = await request.json();

    console.log('🔄 Atualizando passeio via SQL:', id);

    const updateFields = [];
    const values = [];
    let paramIndex = 1;

    // Helper to add field
    const addField = (col: string, val: any) => {
      updateFields.push(`${col} = $${paramIndex++}`);
      values.push(val);
    };

    const parseSafeFloat = (val: any) => {
      const parsed = parseFloat(val);
      return isNaN(parsed) ? null : parsed;
    };

    // Mapping logic
    if (passeioData.name || passeioData.nome) addField('nome', passeioData.name || passeioData.nome);
    if (passeioData.description || passeioData.descricao) addField('descricao', passeioData.description || passeioData.descricao);
    if (passeioData.price || passeioData.preco) addField('preco', parseSafeFloat(passeioData.price || passeioData.preco) || 0);
    if (passeioData.duration || passeioData.duracao) addField('duracao', passeioData.duration ? `${passeioData.duration}h` : (passeioData.duracao || ""));
    if (passeioData.type || passeioData.categoria) addField('categoria', passeioData.type || passeioData.categoria);
    if (passeioData.images || passeioData.imagens) addField('imagens', JSON.stringify(passeioData.images || passeioData.imagens || []));
    if (passeioData.includedItems || passeioData.inclusoes) addField('inclusoes', JSON.stringify(passeioData.includedItems || passeioData.inclusoes || []));
    if (passeioData.languages || passeioData.idiomas) addField('idiomas', JSON.stringify(passeioData.languages || passeioData.idiomas || []));
    if (passeioData.maxPeople || passeioData.capacidadeMaxima) addField('capacidade_maxima', parseInt(passeioData.maxPeople || passeioData.capacidadeMaxima) || 20);

    if (passeioData.tarifa2Pessoas !== undefined) addField('tarifa_2_pessoas', parseSafeFloat(passeioData.tarifa2Pessoas));
    if (passeioData.tarifa4Pessoas !== undefined) addField('tarifa_4_pessoas', parseSafeFloat(passeioData.tarifa4Pessoas));
    if (passeioData.tarifa6Pessoas !== undefined) addField('tarifa_6_pessoas', parseSafeFloat(passeioData.tarifa6Pessoas));
    if (passeioData.tarifa8Pessoas !== undefined) addField('tarifa_8_pessoas', parseSafeFloat(passeioData.tarifa8Pessoas));
    if (passeioData.tarifa10Pessoas !== undefined) addField('tarifa_10_pessoas', parseSafeFloat(passeioData.tarifa10Pessoas));
    if (passeioData.sobConsultaTexto !== undefined) addField('sob_consulta_texto', passeioData.sobConsultaTexto || null);
    if (passeioData.descontoGrupo !== undefined) addField('desconto_grupo', parseSafeFloat(passeioData.descontoGrupo));

    // Status check
    const isActive = (passeioData.status === 'Ativo' || passeioData.ativo === 1 || passeioData.ativo === true) ? 1 : 0;
    // Only update active if explicitly provided or implied by status string
    if (passeioData.status !== undefined || passeioData.ativo !== undefined) {
      addField('ativo', isActive);
    }

    updateFields.push(`atualizado_em = NOW()`);

    if (updateFields.length === 0) {
      return NextResponse.json({ message: "Nada a atualizar" });
    }

    values.push(id);
    const query = `UPDATE passeios SET ${updateFields.join(", ")} WHERE id = $${paramIndex} RETURNING *`;

    const result = await db.query(query, values);
    const updatedPasseio = result.rows[0];

    if (!updatedPasseio) {
      return NextResponse.json({ error: 'Passeio não encontrado' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Passeio atualizado com sucesso',
      passeio: {
        ...updatedPasseio,
        capacidadeMaxima: updatedPasseio.capacidade_maxima
      }
    });
  } catch (error) {
    console.error('❌ Erro ao atualizar passeio:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await db.ensurePasseiosColumnsExist();
    const { id } = await params;
    console.log('🗑️ Excluindo passeio via SQL:', id);

    const result = await db.query('DELETE FROM passeios WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Passeio não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Passeio excluído com sucesso' });
  } catch (error) {
    console.error('❌ Erro ao excluir passeio:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
