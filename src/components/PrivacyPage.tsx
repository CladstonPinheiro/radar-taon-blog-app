/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { ShieldCheck, BadgeCheck, ArrowLeft, Send, CheckCircle2, AlertCircle } from "lucide-react";

interface PrivacyPageProps {
  onNavigateHome: () => void;
}

const TOC = [
  { n: "01", label: "Quem é o Controlador" },
  { n: "02", label: "Dados que coletamos" },
  { n: "03", label: "Como usamos seus dados" },
  { n: "04", label: "Base legal" },
  { n: "05", label: "Compartilhamento" },
  { n: "06", label: "Retenção dos dados" },
  { n: "07", label: "Segurança" },
  { n: "08", label: "Seus direitos (LGPD)" },
  { n: "09", label: "Cookies" },
  { n: "10", label: "Menores de idade" },
  { n: "11", label: "Alterações" },
  { n: "12", label: "Contato e DPO" },
];

const RIGHTS = [
  { title: "Acesso", desc: "Saber quais dados seus temos armazenados." },
  { title: "Correção", desc: "Corrigir dados incompletos, inexatos ou desatualizados." },
  { title: "Exclusão", desc: "Solicitar a eliminação dos seus dados." },
  { title: "Oposição", desc: "Opor-se ao tratamento em determinadas situações." },
  { title: "Portabilidade", desc: "Receber seus dados em um formato estruturado." },
  { title: "Revogação", desc: "Revogar o consentimento dado anteriormente." },
  { title: "Informação", desc: "Saber com quem compartilhamos seus dados." },
  { title: "Reclamação", desc: "Reclamar junto à ANPD (gov.br/anpd)." },
];

export default function PrivacyPage({ onNavigateHome }: PrivacyPageProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar");
      }

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex-grow flex flex-col w-full">
      {/* Hero band */}
      <div className="bg-[#0e1c2e] text-white px-4 md:px-8 py-12 text-center">
        <div className="max-w-[860px] mx-auto flex flex-col items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "Outfit, sans-serif" }}>
            Política de Privacidade
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-lg">
            Explicamos de forma clara como coletamos, usamos e protegemos os seus dados pessoais
            no Radar Tá On.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-xs font-semibold">
              <BadgeCheck className="w-4 h-4 text-[#60a5fa]" />
              Vigência junho de 2026
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#60a5fa]" />
              Em conformidade com a LGPD
            </span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs text-slate-300 mt-1">
            Em conformidade com a Lei Geral de Proteção de Dados — Lei nº 13.709/2018
          </div>
        </div>
      </div>

      <div className="max-w-[860px] mx-auto w-full px-4 md:px-8 py-8 flex flex-col gap-8">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-1.5 text-sm font-semibold text-[#004ac6] hover:text-[#fc7728] transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o início
        </button>

        {/* Index */}
        <div className="bg-[#eff3ff] rounded-xl border border-[#004ac6]/10 p-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#004ac6] mb-3">Índice</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {TOC.map((item) => (
              <a
                key={item.n}
                href={`#privacidade-${item.n}`}
                className="flex items-center gap-2 text-[#434655] hover:text-[#004ac6] transition-colors"
              >
                <span className="text-[#004ac6] font-bold">{item.n}</span>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* 01 */}
        <section id="privacidade-01" className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-[#0e1c2e]">01. Quem é o Controlador dos Dados</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            O responsável pelo tratamento dos dados pessoais coletados pelo Radar Tá On é o{" "}
            <strong>Tá On Anúncios</strong>, operado por pessoa física com sede em Brasília,
            Distrito Federal, que também mantém o Radar Tá On como seu blog oficial de notícias.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Para fins da LGPD, o Tá On Anúncios atua como <strong>Controlador</strong> dos dados
            pessoais dos leitores, inscritos no Alerta de Vagas e da equipe editorial do blog.
          </p>
        </section>

        {/* 02 */}
        <section id="privacidade-02" className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-[#0e1c2e]">02. Dados que Coletamos</h2>
          <h3 className="text-sm font-bold text-[#0e1c2e]">2.1 Dados fornecidos por você</h3>
          <div className="overflow-x-auto rounded-lg border border-slate-100">
            <table className="w-full text-sm">
              <thead className="bg-[#0e1c2e] text-white">
                <tr>
                  <th className="text-left font-semibold px-4 py-2.5">Dado</th>
                  <th className="text-left font-semibold px-4 py-2.5">Quando coletado</th>
                  <th className="text-left font-semibold px-4 py-2.5">Finalidade</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2.5">E-mail</td>
                  <td className="px-4 py-2.5">Inscrição no Alerta de Vagas</td>
                  <td className="px-4 py-2.5">Envio de novidades e oportunidades por e-mail</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2.5">Nome e e-mail</td>
                  <td className="px-4 py-2.5">Cadastro de editor/admin</td>
                  <td className="px-4 py-2.5">Login e identificação da equipe editorial</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2.5">Senha</td>
                  <td className="px-4 py-2.5">Cadastro de editor/admin</td>
                  <td className="px-4 py-2.5">Autenticação segura (armazenada com hash)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 className="text-sm font-bold text-[#0e1c2e] mt-2">2.2 Dados coletados automaticamente</h3>
          <ul className="list-disc list-inside text-sm text-slate-600 leading-relaxed flex flex-col gap-1">
            <li>Endereço IP e dados de geolocalização aproximada;</li>
            <li>Tipo de dispositivo e navegador;</li>
            <li>Páginas visitadas e tempo de navegação;</li>
            <li>Dados de cookies e tecnologias similares.</li>
          </ul>
        </section>

        {/* 03 */}
        <section id="privacidade-03" className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-[#0e1c2e]">03. Como Usamos seus Dados</h2>
          <p className="text-sm text-slate-600">Utilizamos seus dados pessoais para as seguintes finalidades:</p>
          <ul className="list-disc list-inside text-sm text-slate-600 leading-relaxed flex flex-col gap-1">
            <li>Enviar as novidades do Alerta de Vagas para quem se inscreveu;</li>
            <li>Permitir que a equipe editorial publique e gerencie o conteúdo do blog;</li>
            <li>Melhorar a experiência de navegação e os conteúdos oferecidos;</li>
            <li>Cumprir obrigações legais e regulatórias;</li>
            <li>Prevenir fraudes e garantir a segurança da plataforma.</li>
          </ul>
        </section>

        {/* 04 */}
        <section id="privacidade-04" className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-[#0e1c2e]">04. Base Legal para o Tratamento</h2>
          <p className="text-sm text-slate-600">
            Todo tratamento de dados realizado pelo Radar Tá On tem fundamento em uma das bases
            legais previstas na LGPD:
          </p>
          <ul className="text-sm text-slate-600 leading-relaxed flex flex-col gap-1.5">
            <li><strong>Legítimo interesse:</strong> segurança da plataforma, prevenção de fraudes e melhoria dos serviços;</li>
            <li><strong>Consentimento:</strong> inscrição no Alerta de Vagas e uso de cookies não essenciais;</li>
            <li><strong>Obrigação legal:</strong> cumprimento de requisitos legais e regulatórios.</li>
          </ul>
        </section>

        {/* 05 */}
        <section id="privacidade-05" className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-[#0e1c2e]">05. Compartilhamento de Dados</h2>
          <p className="text-sm text-slate-600">
            Seus dados <strong>não são vendidos</strong> a terceiros. Podemos compartilhá-los
            apenas nas seguintes situações:
          </p>
          <ul className="text-sm text-slate-600 leading-relaxed flex flex-col gap-1.5">
            <li><strong>Prestadores de serviço:</strong> empresas que nos auxiliam a operar a plataforma (hospedagem, banco de dados, geração assistida de rascunhos de conteúdo), sujeitas a contratos de confidencialidade;</li>
            <li><strong>Autoridades competentes:</strong> quando exigido por lei ou ordem judicial.</li>
          </ul>
          <div className="bg-[#eff3ff] border border-[#004ac6]/10 rounded-lg px-4 py-3 text-sm text-[#0e1c2e]">
            <strong>Fornecedores utilizados atualmente:</strong> Supabase (banco de dados e
            armazenamento de imagens), Vercel (hospedagem) e Google (geração assistida de
            rascunhos de conteúdo pela equipe editorial). Todos operam com políticas de
            privacidade compatíveis com a LGPD/GDPR.
          </div>
        </section>

        {/* 06 */}
        <section id="privacidade-06" className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-[#0e1c2e]">06. Retenção dos Dados</h2>
          <p className="text-sm text-slate-600">
            Mantemos seus dados pelo tempo necessário para as finalidades descritas nesta política
            ou conforme exigido por lei:
          </p>
          <ul className="text-sm text-slate-600 leading-relaxed flex flex-col gap-1.5">
            <li><strong>Inscrição no Alerta de Vagas:</strong> mantida até você solicitar o cancelamento;</li>
            <li><strong>Contas de editor/admin:</strong> mantidas enquanto a conta estiver ativa;</li>
            <li><strong>Logs de acesso:</strong> mantidos por 6 meses, conforme o Marco Civil da Internet;</li>
            <li><strong>Após exclusão da conta:</strong> dados são removidos em até 30 dias, salvo obrigações legais.</li>
          </ul>
        </section>

        {/* 07 */}
        <section id="privacidade-07" className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-[#0e1c2e]">07. Segurança dos Dados</h2>
          <p className="text-sm text-slate-600">Adotamos medidas técnicas e organizacionais para proteger seus dados:</p>
          <ul className="list-disc list-inside text-sm text-slate-600 leading-relaxed flex flex-col gap-1">
            <li>Transmissão de dados via protocolo HTTPS (TLS);</li>
            <li>Senhas armazenadas com hash criptográfico;</li>
            <li>Acesso restrito aos dados por autenticação;</li>
            <li>Banco de dados com políticas de Row Level Security (RLS);</li>
            <li>Monitoramento contínuo da plataforma.</li>
          </ul>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-900">
            <strong>Importante:</strong> nenhum sistema é 100% seguro. Em caso de incidente que
            possa afetar seus dados, notificaremos os titulares afetados e a Autoridade Nacional
            de Proteção de Dados (ANPD), conforme exigido pela LGPD.
          </div>
        </section>

        {/* 08 */}
        <section id="privacidade-08" className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-[#0e1c2e]">08. Seus Direitos como Titular (LGPD)</h2>
          <p className="text-sm text-slate-600">
            A LGPD garante a você os seguintes direitos em relação aos seus dados pessoais:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RIGHTS.map((r) => (
              <div key={r.title} className="bg-white border border-slate-100 rounded-lg p-3.5">
                <p className="text-sm font-bold text-[#0e1c2e] mb-0.5">{r.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600">
            Para exercer seus direitos, entre em contato pelo e-mail{" "}
            <strong>privacidade@taonaltiplano.com.br</strong>. Responderemos em até 15 dias úteis.
          </p>
        </section>

        {/* 09 */}
        <section id="privacidade-09" className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-[#0e1c2e]">09. Cookies</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Utilizamos cookies e tecnologias similares para garantir o funcionamento do blog e
            melhorar sua experiência de navegação.
          </p>
        </section>

        {/* 10 */}
        <section id="privacidade-10" className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-[#0e1c2e]">10. Menores de Idade</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            O conteúdo do Radar Tá On é informativo e voltado ao público em geral. Não coletamos
            intencionalmente dados pessoais de menores de idade. Caso identifiquemos que dados de
            um menor foram coletados sem autorização dos responsáveis, procederemos com a exclusão
            imediata.
          </p>
        </section>

        {/* 11 */}
        <section id="privacidade-11" className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-[#0e1c2e]">11. Alterações nesta Política</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Esta política pode ser atualizada periodicamente. Comunicaremos alterações relevantes
            por e-mail e/ou aviso na plataforma. A versão mais recente estará sempre disponível em
            blog.taonaltiplano.com.br/#/privacidade.
          </p>
        </section>

        {/* 12 */}
        <section id="privacidade-12" className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-[#0e1c2e]">12. Contato e Encarregado de Dados</h2>
          <p className="text-sm text-slate-600">
            Para exercer seus direitos, tirar dúvidas ou fazer solicitações relacionadas à
            privacidade:
          </p>
          <ul className="text-sm text-slate-600 leading-relaxed flex flex-col gap-1">
            <li><strong>E-mail de privacidade:</strong> privacidade@taonaltiplano.com.br</li>
            <li><strong>E-mail geral:</strong> comercial@taonaltiplano.com.br</li>
            <li><strong>Site:</strong> taonaltiplano.com.br</li>
            <li><strong>Autoridade Nacional:</strong> gov.br/anpd</li>
          </ul>
        </section>

        {/* Bottom CTA / contact form */}
        <div className="bg-[#0e1c2e] rounded-2xl px-6 py-8 flex flex-col items-center gap-4">
          <div className="text-center flex flex-col gap-1.5">
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
              Sua privacidade é nossa prioridade
            </h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto">
              Dúvidas sobre como tratamos seus dados? Preencha abaixo e nossa equipe responde por e-mail.
            </p>
          </div>

          {status === "sent" ? (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-sm rounded-lg px-4 py-3 max-w-md w-full">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              Mensagem enviada! Nossa equipe vai te responder em breve.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-3">
              <input
                type="text"
                required
                placeholder="Seu nome"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/10 border border-white/15 rounded-lg py-2.5 px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#fc7728]/40"
              />
              <input
                type="email"
                required
                placeholder="Seu e-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/10 border border-white/15 rounded-lg py-2.5 px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#fc7728]/40"
              />
              <textarea
                required
                rows={3}
                placeholder="Sua mensagem"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white/10 border border-white/15 rounded-lg py-2.5 px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#fc7728]/40 resize-none"
              />

              {status === "error" && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-400/30 text-red-300 text-xs rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Não foi possível enviar agora. Tente novamente em alguns instantes.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 bg-[#fc7728] hover:bg-[#e05b0d] disabled:opacity-60 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
              >
                {status === "sending" ? (
                  "Enviando..."
                ) : (
                  <>
                    Falar sobre privacidade
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
