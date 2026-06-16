/**
 * Serverless Function da Vercel.
 *
 * Recebe do formulário de Privacidade os campos (name, email, message),
 * chama a API do Resend no SERVIDOR (usando a chave secreta RESEND_API_KEY,
 * que nunca é enviada ao navegador) e envia um e-mail para a equipe de
 * suporte.
 *
 * IMPORTANTE: este arquivo só funciona se estiver dentro de uma pasta
 * chamada "api" na RAIZ do projeto (mesmo nível de "src" e
 * "package.json"). NÃO deve ficar dentro de "src".
 */

export default async function handler(req: any, res: any) {
  // Só aceita requisições do tipo POST
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método não permitido." });
    return;
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    res.status(400).json({ error: "Preencha nome, e-mail e mensagem." });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Só deve acontecer se a variável não foi configurada na Vercel
    console.error("RESEND_API_KEY não está configurada nas variáveis de ambiente.");
    res.status(500).json({ error: "Configuração do servidor incompleta." });
    return;
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Radar Tá On <contato@taonaltiplano.com.br>",
        to: ["suporte@taonaltiplano.com.br"],
        reply_to: email,
        subject: `[Privacidade] Mensagem de ${name}`,
        html: `
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail para resposta:</strong> ${email}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${String(message).replace(/\n/g, "<br/>")}</p>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("Erro retornado pelo Resend:", errorText);
      res.status(502).json({ error: "Não foi possível enviar a mensagem. Tente novamente." });
      return;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar e-mail de contato:", error);
    res.status(500).json({ error: "Erro ao enviar a mensagem. Tente novamente." });
  }
}
