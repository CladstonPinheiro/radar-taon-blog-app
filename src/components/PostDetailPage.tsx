/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Calendar, Clock, Link, Mail, Check, MessageSquare, AlertCircle } from "lucide-react";
import { BlogPost, Category } from "../types";
import CtaAdBox from "./CtaAdBox";

interface PostDetailPageProps {
  postId: string;
  posts: BlogPost[];
  onNavigateHome: () => void;
  onNavigateCategory: (category: Category) => void;
  onNavigatePost: (postId: string) => void;
}

export default function PostDetailPage({
  postId,
  posts,
  onNavigateHome,
  onNavigateCategory,
  onNavigatePost,
}: PostDetailPageProps) {
  const [copied, setCopied] = useState(false);

  const post = posts.find((p) => p.id === postId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [postId]);

  if (!post) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center py-16 px-4 text-center font-sans">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
        <h2 className="font-headline-md text-2xl font-bold text-[#0e1c2e]">Artigo não encontrado</h2>
        <p className="text-[#434655] text-sm mt-1 max-w-sm">
          O artigo que você está tentando acessar pode ter sido removido ou o link está incorreto.
        </p>
        <button
          onClick={onNavigateHome}
          className="mt-6 bg-[#004ac6] hover:bg-[#003ea8] text-white font-bold text-sm px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
        >
          Voltar para a Página Inicial
        </button>
      </div>
    );
  }

  let related = posts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3);
  if (related.length < 3) {
    const fillers = posts.filter((p) => p.id !== post.id && !related.some((r) => r.id === p.id)).slice(0, 3 - related.length);
    related = [...related, ...fillers];
  }

  const handleCopyLink = () => {
    const simulatedUrl = `${window.location.origin}/#/post/${post.id}`;
    navigator.clipboard.writeText(simulatedUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShareClick = (platform: "email" | "whatsapp" | "facebook") => {
    const simulatedText = `Confira esta matéria no Radar Tá On: "${post.title}"`;
    const simulatedUrl = `${window.location.origin}/#/post/${post.id}`;
    let shareUrl = "";

    switch (platform) {
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(simulatedText + "\n" + simulatedUrl)}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(simulatedText + " - " + simulatedUrl)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(simulatedUrl)}`;
        break;
    }

    window.open(shareUrl, "_blank");
  };

  const postVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={postVariants}
      initial="hidden"
      animate="visible"
      className="flex-grow flex flex-col gap-8 font-sans"
    >
      <div className="flex justify-between items-center">
        <button
          onClick={() => onNavigateCategory(post.category)}
          id="btn-back-to-category"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#004ac6] hover:text-[#fc7728] transition-colors group px-1.5 py-1"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Voltar para {post.category}
        </button>
      </div>

      <article className="bg-white rounded-xl border border-slate-100 p-6 md:p-8 shadow-sm flex flex-col gap-6">
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateCategory(post.category)}
              className="px-3 py-1 bg-[#004ac6]/10 hover:bg-[#004ac6]/20 text-[#004ac6] text-xs font-extrabold rounded-full transition-colors cursor-pointer"
            >
              {post.category}
            </button>
            <span className="flex items-center gap-1 text-xs text-slate-400 font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1
            className="font-headline-xl text-xl md:text-3xl lg:text-4xl text-[#0e1c2e] font-black leading-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {post.title}
          </h1>

          <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
            {post.summary}
          </p>

          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Por {post.author} • Radar Tá On
          </p>
        </header>

        <div className="aspect-[16/9] w-full bg-slate-50 rounded-xl overflow-hidden shadow-xs border border-slate-100 relative">
          <img
            src={post.imageUrl}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-slate-700 text-sm md:text-base leading-relaxed space-y-5 whitespace-pre-wrap">
          {post.content}
        </div>

        <CtaAdBox
          title="Buscando o emprego ideal ou classificados no DF?"
          subtitle="No Tá On Anúncios você encontra as melhores ofertas imobiliárias de Águas Claras, consórcios de veículos, ofertas de serviços locais e vagas de emprego exclusivas no Distrito Federal."
          buttonText="Encontre Melhores Oportunidades no Tá On"
          isOrange={true}
        />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100 pt-6 mt-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Gostou desta notícia? Compartilhe com amigos:
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleCopyLink}
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-full border transition-all cursor-pointer min-w-[44px] min-h-[44px] ${
                copied
                  ? "bg-green-50 border-green-200 text-green-600"
                  : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-[#004ac6]"
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600 animate-scale" /> : <Link className="w-3.5 h-3.5" />}
              {copied ? "Copiado!" : "Copiar Link"}
            </button>

            <button
              onClick={() => handleShareClick("whatsapp")}
              className="inline-flex items-center justify-center p-2 rounded-full border border-slate-200 text-green-600 hover:bg-green-50 transition-colors cursor-pointer min-w-[44px] min-h-[44px]"
              aria-label="Compartilhar no WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleShareClick("email")}
              className="inline-flex items-center justify-center p-2 rounded-full border border-slate-200 text-[#004ac6] hover:bg-blue-50 transition-colors cursor-pointer min-w-[44px] min-h-[44px]"
              aria-label="Enviar por e-mail"
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>

      <CtaAdBox isOrange={false} />

      <section className="flex flex-col gap-4 mt-2">
        <h2
          className="font-headline-md text-lg md:text-2xl font-bold text-[#0e1c2e]"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Notícias Relacionadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((item) => (
            <article
              key={item.id}
              onClick={() => onNavigatePost(item.id)}
              className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-shadow cursor-pointer flex flex-col"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-slate-50 relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="object-cover w-full h-full group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-[#eff3ff] text-[#004ac6] text-[9px] font-black px-2 py-0.5 rounded shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1 gap-2">
                <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
                <h3 className="font-headline-md text-xs font-bold text-[#0e1c2e] leading-snug line-clamp-2 group-hover:text-[#004ac6] transition-colors flex-grow">
                  {item.title}
                </h3>
                <span className="text-[10px] font-extrabold text-[#004ac6] flex items-center gap-0.5 mt-2 hover:underline">
                  Ler matéria completa
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
