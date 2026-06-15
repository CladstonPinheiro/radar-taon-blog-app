/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, Mail, TrendingUp, Grid, Megaphone, CheckCircle2 } from "lucide-react";
import { Category, BlogPost, MOCK_POSTS } from "../types";

interface SidebarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onNavigateCategory: (category: Category) => void;
  onNavigatePost: (postId: string) => void;
  hideNewsletter?: boolean;
}

export default function Sidebar({
  onSearch,
  searchQuery,
  onNavigateCategory,
  onNavigatePost,
  hideNewsletter = false,
}: SidebarProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Por favor, digite um e-mail válido.");
      return;
    }
    setSubscribed(true);
    setErrorMsg("");
    setEmail("");
  };

  // Get 3 popular posts for highlights ("Mais Lidas")
  const popularPosts: BlogPost[] = MOCK_POSTS.slice().sort((a, b) => b.readTime.localeCompare(a.readTime)).slice(0, 3);

  return (
    <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6 font-sans">
      
      {/* 1. Search Widget */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-[0_4px_20px_rgba(2,15,33,0.06)]">
        <h3 className="font-bold text-sm text-[#0e1c2e] uppercase tracking-wider border-b-2 border-[#004ac6] pb-1.5 inline-block mb-4">
          Buscar Notícias
        </h3>
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-[#004ac6] focus:ring-1 focus:ring-[#004ac6] transition-all text-[#0e1c2e]"
            placeholder="O que você procura?"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#434655] hover:text-[#004ac6] focus:outline-none min-w-[32px] min-h-[32px] flex items-center justify-center"
            aria-label="Buscar"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* 2. Busca e Destaques Widget */}
      <div className="bg-[#eff3ff] rounded-xl p-6 border border-slate-100 flex flex-col shadow-sm">
        <div className="mb-4">
          <h2 className="font-headline-md text-xl font-bold text-[#004ac6]" style={{ fontFamily: "Outfit, sans-serif" }}>
            Busca e Destaques
          </h2>
          <p className="text-xs text-[#434655]">Últimas novidades da capital federal</p>
        </div>

        <nav className="flex flex-col gap-1.5 mb-6">
          <button
            onClick={() => onSearch("")}
            className="flex items-center gap-3 w-full text-left p-2.5 text-[#434655] hover:bg-[#d5e3fd] hover:text-[#004ac6] rounded-lg transition-all text-sm font-semibold min-h-[44px]"
          >
            <TrendingUp className="w-4 h-4 text-[#004ac6]" />
            Mais Recentes
          </button>
          
          <div className="text-xs font-semibold text-[#004ac6]/60 px-2.5 pt-2 uppercase tracking-wide">
            Categorias Rápidas
          </div>
          
          <div className="grid grid-cols-1 gap-1 max-h-48 overflow-y-auto">
            {Object.values(Category).slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => onNavigateCategory(cat)}
                className="flex items-center gap-2.5 w-full text-left py-1.5 px-2.5 text-xs text-[#434655] hover:bg-[#d5e3fd] hover:text-[#004ac6] rounded transition-all font-medium min-h-[36px]"
              >
                <span className="w-1.5 h-1.5 bg-[#004ac6] rounded-full"></span>
                {cat}
              </button>
            ))}
          </div>
        </nav>

        <a
          href="https://www.taonaltiplano.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center bg-[#fc7728] hover:bg-[#e05b0d] text-white py-3 rounded-lg font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 mt-2 min-h-[44px]"
        >
          <Megaphone className="w-4 h-4 text-white animate-pulse" />
          Anuncie no Tá On
        </a>
      </div>

      {/* 3. Popular Posts ("Mais Lidas") Widget */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-[0_4px_20px_rgba(2,15,33,0.06)]">
        <h3 className="font-bold text-sm text-[#0e1c2e] uppercase tracking-wider border-b-2 border-[#004ac6] pb-1.5 inline-block mb-4">
          Destaques Mais Lidos
        </h3>
        <div className="flex flex-col gap-4">
          {popularPosts.map((post, idx) => (
            <div
              key={post.id}
              onClick={() => onNavigatePost(post.id)}
              className="group flex gap-3 cursor-pointer items-start hover:opacity-95"
            >
              <div className="w-6 h-6 rounded-full bg-[#004ac6]/10 text-[#004ac6] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div>
                <p className="text-xs font-bold text-[#004ac6] mb-0.5 hover:underline">
                  {post.category}
                </p>
                <h4 className="text-xs font-semibold text-[#0e1c2e] line-clamp-2 leading-snug group-hover:text-[#004ac6] transition-colors">
                  {post.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Newsletter Widget */}
      {!hideNewsletter && (
        <div className="bg-[#2563eb] text-white p-6 rounded-xl shadow-sm flex flex-col gap-3 relative overflow-hidden">
          {/* Subtle gradient pattern background */}
          <div className="absolute -right-10 -bottom-10 w-28 h-28 bg-[#fc7728]/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <h3 className="font-headline-md text-lg font-bold flex items-center gap-2" style={{ fontFamily: "Outfit, sans-serif" }}>
            <Mail className="w-5 h-5 text-[#fc7728]" />
            Alerta de Vagas
          </h3>
          <p className="text-xs text-white/90 leading-relaxed">
            Receba as melhores oportunidades de emprego, concursos e tendências do DF diretamente no seu e-mail.
          </p>

          {subscribed ? (
            <div className="bg-white/20 p-3.5 rounded-lg border border-white/30 flex flex-col items-center text-center gap-1.5 mt-2 transition-all">
              <CheckCircle2 className="w-6 h-6 text-[#fc7728]" />
              <p className="text-xs font-bold text-white">Inscrição Confirmada!</p>
              <p className="text-[11px] text-white/80">
                Você começará a receber alertas de Brasília em breve.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-1">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-3 text-xs text-white placeholder-white/60 focus:outline-none focus:border-white focus:ring-1 focus:ring-white min-h-[44px]"
              />
              {errorMsg && <p className="text-[11px] text-red-200 font-semibold">{errorMsg}</p>}
              <button
                type="submit"
                className="w-full bg-white text-[#2563eb] hover:bg-slate-100 font-bold text-xs py-2.5 rounded-lg transition-colors cursor-pointer min-h-[44px]"
              >
                Inscrever-se
              </button>
            </form>
          )}
        </div>
      )}
    </aside>
  );
}
