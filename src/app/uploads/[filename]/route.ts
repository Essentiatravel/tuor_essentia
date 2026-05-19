import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    
    // Caminho físico no disco
    const filePath = path.join(process.cwd(), "public", "uploads", filename);

    // Se o arquivo não existir fisicamente, retorna 404
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Arquivo não encontrado no disco: ${filePath}`);
      return new NextResponse("Imagem não encontrada", { status: 404 });
    }

    // Lê o arquivo do disco
    const fileBuffer = await fs.promises.readFile(filePath);

    // Determina o tipo de conteúdo (Content-Type) com base na extensão
    const ext = path.extname(filename).toLowerCase();
    let contentType = "application/octet-stream";
    
    if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".png") contentType = "image/png";
    else if (ext === ".webp") contentType = "image/webp";
    else if (ext === ".gif") contentType = "image/gif";
    else if (ext === ".svg") contentType = "image/svg+xml";

    // Retorna a imagem com os headers apropriados de cache
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("❌ Erro ao servir imagem de upload:", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}
