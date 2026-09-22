export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import fs from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    // Validação de segurança de arquivos (Security & Malware Prevention)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Arquivo muito grande. O limite máximo é de 5MB." }, { status: 400 });
    }

    const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg", ".pdf"]);
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: `Tipo de arquivo não permitido (${ext}). Envie apenas imagens ou PDFs.` },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const relativeUploadDir = "/uploads";
    const uploadDir = path.join(process.cwd(), "public", relativeUploadDir);

    // Garante que o diretório existe
    if (!fs.existsSync(uploadDir)) {
      await fs.promises.mkdir(uploadDir, { recursive: true });
    }

    // Gera nome único para o arquivo
    const uniqueSuffix = `${Date.now()}-${randomUUID()}`;
    const filename = `${uniqueSuffix}-${file.name.replace(/\s/g, "-")}`;
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    const fileUrl = `${relativeUploadDir}/${filename}`;

    return NextResponse.json({
      success: true,
      url: fileUrl,
      message: "Upload realizado com sucesso"
    });
  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json({ error: "Erro ao fazer upload do arquivo" }, { status: 500 });
  }
}
