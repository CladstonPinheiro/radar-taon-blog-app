/**
 * Serverless Function da Vercel.
 *
 * Recebe do Editor um tema (topic) e uma categoria (category), chama a
 * API do Gemini no SERVIDOR (usando a chave secreta GEMINI_API_KEY, que
 * nunca é enviada ao navegador) e devolve um rascunho de post em JSON:
 * { title, summary, content }.
 *
 * IMPORTANTE: este arquivo só funciona se estiver dentro de uma pasta
 * chamada "api" na RAIZ do projeto (mesmo nível de "src" e
 * "package.json"). NÃO deve ficar dentro de "src".
 */

import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  // Só aceita requisições do tipo POST
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método não permitido." });
    return;
  }

  const { topic, category } = req.body || {};

  if (!topic || typeof topic !== "string" || !topic.trim()) {
    res.status(400).json({ error: "Informe o tema do post." });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Só deve acontecer se a variável não foi configurada na Vercel
    console.error("GEMINI_API_KEY não está configurada nas variáveis de ambiente.");
    res.status(500).json({ error: "Configuração do servidor incompleta." });
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Crie um rascunho de post para o blog "Radar Tá On" sobre o seguinte tema: "${topic}".
Categoria: ${category || "Notícias"}

Responda SOMENTE com um JSON válido, sem nenhum texto antes ou depois, no formato:
{
  "title": "título do post",
  "summary": "resumo em 1-2 frases",
  "content": "conteúdo do post em 3-4 parágrafos"
}

Escreva em português brasileiro, tom informativo e regional (Brasília/DF).`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    if (!parsed.title || !parsed.summary || !parsed.content) {
      throw new Error("Resposta da IA veio incompleta.");
    }

    res.status(200).json({
      title: parsed.title,
      summary: parsed.summary,
      content: parsed.content,
    });
  } catch (error) {
    console.error("Erro ao gerar conteúdo com Gemini:", error);
    res.status(500).json({ error: "Erro ao gerar conteúdo. Tente novamente." });
  }
}
