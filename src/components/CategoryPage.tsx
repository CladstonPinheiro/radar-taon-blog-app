/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Calendar, Clock, ChevronLeft, ChevronRight, Newspaper, Briefcase, Home, Car, TrendingUp, ShieldAlert, CalendarRange, Search } from "lucide-react";
import { BlogPost, Category } from "../types";

interface CategoryPageProps {
  category: Category;
  posts: BlogPost[];
  onNavigateHome: () => void;
  onNavigatePost: (postId: string) => void;
}

export default function CategoryPage({
  category,
  posts,
  onNavigateHome,
  onNavigatePost,
}: CategoryPageProps) {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [localSearch, setLocalSearch] = useState("");
  const itemsPerPage = 3;

  // Custom descriptions based on Category
  const categoryDescription = useMemo(() => {
    switch (category) {
      case Category.NoticiasDF:
        return "Acompanhe tudo o que acontece de mais relevante no cenário social, governamental e urbano de Brasília e cidades satélites. Notícias em primeira mão e oficiais.";
      case Category.Empregos:
        return "Fique por dentro das melhores vagas de emprego, concursos e oportunidades de carreira em Brasília e no Distrito Federal. Atualizações diárias para impulsionar seu futuro profissional.";
      case Category.ImoveisDF:
        return "Análises de valorização imobiliária, novidades de lançamentos residenciais de condomínios, e dicas estratégicas de financiamento habitacional na capital.";
      case Category.Veiculos:
        return "Acompanhe as tendências de mobilidade urbana sustentável, recordes de emplacamentos de carros elétricos/híbridos, e guias de seminovos no DF.";
      case Category.GuiaDeCompras:
        return "Descubra feiras orgânicas locais, rotas do artesanato típico candango, brechós estilizados e as melhores dicas de consumo consciente em Brasília.";
      case Category.Negocios:
        return "A força do microempreendedor individual (MEI), trajetórias de pequenas e médias empresas, e franquias de sucesso que inovam no mercado regional.";
      case Category.SegurancaDigital:
        return "Guias atualizados contra fraudes virtuais no WhatsApp, LGPD descomplicada para microlojas e melhores práticas de TI para proteger seu comércio local.";
      case Category.AgendaDF:
        return "Festival de cinema, shows gratuitos no CCBB, atividades extras exclusivas nos eixos aos fins de semana e a cena cultural pulsante do Planalto Central.";
    }
  }, [category]);

  const renderCategoryIcon = () => {
    const iconClass = "w-10 h-10 md:w-12 md:h-12 text-[#004ac6] shrink-0";
    switch (category) {
      case Category.NoticiasDF: return <Newspaper className={iconClass} />;
      case Category.Empregos: return <Briefcase className={iconClass} />;
      case Category.ImoveisDF: return <Home className={iconClass} />;
      case Category.Veiculos: return <Car className={iconClass} />;
      case Category.GuiaDeCompras: return <Newspaper className={iconClass} />;
      case Category.Negocios: return <TrendingUp className={iconClass} />;
      case Category.SegurancaDigital: return <ShieldAlert className={iconClass} />;
      case Category.AgendaDF: return <CalendarRange className={iconClass} />;
    }
  };

  // Filter posts based on category and optional inner search
  const filteredPosts = useMemo(() => {
    const matchedCategoryPosts = posts.filter((p) => p.category === category);
    if (!localSearch.trim()) return matchedCategoryPosts;
    return matchedCategoryPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(localSearch.toLowerCase()) ||
        p.summary.toLowerCase().includes(localSearch.toLowerCase()) ||
        p.content.toLowerCase().includes(localSearch.toLowerCase())
    );
  }, [posts, category, localSearch]);

  // Paginated articles
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / itemsPerPage));
  const activePosts = useMemo(() => {
    const startIdx = (currentPageNum - 1) * itemsPerPage;
    return filteredPosts.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredPosts, currentPageNum]);

  // Adjust page to 1 if search filters reduce list
  const handleLocalSearchChange = (query: string) => {
    setLocalSearch(query);
    setCurrentPageNum(1);
  };

  const handlePrevPage = () => {
    if (currentPageNum > 1) setCurrentPageNum(currentPageNum - 1);
  };

  const handleNextPage = () => {
    if (currentPageNum < totalPages) setCurrentPageNum(currentPageNum + 1);
  };

  // Reset category lists layout animations
  const pageVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="flex-grow flex flex-col gap-8 font-sans"
    >
      {/* 1. Back navigation arrow */}
      <div>
        <button
          onClick={onNavigateHome}
          id="btn-back-to-home"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#004ac6] hover:text-[#fc7728] transition-colors group px-1.5 py-1"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Voltar para a Página Inicial
        </button>
      </div>

      {/* 2. Category Banner (Styled perfectly based on design screenshot 1) */}
      <section className="bg-[#eff3ff] rounded-xl p-6 md:p-8 border border-[#c3c6d7]/10 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {renderCategoryIcon()}
        <div className="flex-1 text-center sm:text-left">
          <h1
            className="font-headline-xl text-2xl md:text-4xl font-extrabold text-[#004ac6] mb-2 leading-none"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {category}
          </h1>
          <p className="text-sm md:text-base text-[#434655] leading-relaxed max-w-3xl">
            {categoryDescription}
          </p>
        </div>
      </section>

      {/* 3. In-Category Micro Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-slate-50 shadow-xs">
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
          Filtrar em {category} ({filteredPosts.length} posts)
        </p>
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Buscar nesta categoria..."
            value={localSearch}
            onChange={(e) => handleLocalSearchChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-3 pr-8 text-xs focus:outline-none focus:border-[#004ac6] text-[#0e1c2e]"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
        </div>
      </div>

      {/* 4. Filtered Blog posts grid */}
      {activePosts.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-100 shadow-sm">
          <p className="text-[#434655] text-sm">Nenhuma matéria publicada corresponde ao filtro nesta categoria.</p>
          {localSearch && (
            <button
              onClick={() => handleLocalSearchChange("")}
              className="mt-3 text-xs font-bold text-[#004ac6] hover:underline"
            >
              Limpar busca interna
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {activePosts.map((post, idx) => {
            // Alternating layouts for custom premium look (Design 1)
            const isHorizontalLandscape = idx === 2 || idx === 3; // Card 3 in design is landscape row
            
            if (isHorizontalLandscape) {
              return (
                <article
                  key={post.id}
                  onClick={() => onNavigatePost(post.id)}
                  className="bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-[0_4px_20px_rgba(2,15,33,0.06)] transition-all duration-200 cursor-pointer flex flex-col md:flex-row group"
                >
                  <div className="md:w-1/3 h-52 bg-slate-50 overflow-hidden shrink-0 relative">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center flex-1">
                    <div className="flex items-center gap-3 text-slate-400 text-xs mb-3">
                      <span className="bg-[#004ac6]/10 text-[#004ac6] px-2.5 py-1 rounded-full text-[11px] font-extrabold shadow-xs">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-headline-md text-base md:text-xl font-bold text-[#0e1c2e] mb-3 group-hover:text-[#004ac6] transition-colors leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-slate-500 text-xs lines-clamp-3 mb-4 leading-relaxed">
                      {post.summary}
                    </p>
                    <span className="text-xs font-bold text-[#004ac6] flex items-center gap-1 hover:underline mt-auto">
                      Ler artigo completo
                      <ArrowRight className="w-4 h-4 text-[#004ac6]" />
                    </span>
                  </div>
                </article>
              );
            }

            // Standard layout
            return (
              <article
                key={post.id}
                onClick={() => onNavigatePost(post.id)}
                className="bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-[0_4px_20px_rgba(2,15,33,0.06)] transition-all duration-200 cursor-pointer flex flex-col group"
              >
                <div className="h-56 bg-slate-50 overflow-hidden relative">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white text-[#004ac6] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-slate-400 text-xs mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-headline-md text-base md:text-lg font-bold text-[#0e1c2e] group-hover:text-[#004ac6] transition-colors leading-tight mb-2.5">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 text-xs line-clamp-3 mb-4 leading-relaxed">
                    {post.summary}
                  </p>

                  <div className="flex justify-between items-center mt-auto pt-3 border-t border-slate-50">
                    <span className="text-xs font-bold text-[#004ac6] flex items-center gap-1 hover:underline">
                      Ler artigo completo
                      <ArrowRight className="w-4 h-4 text-[#004ac6]" />
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold uppercase">
                      Escrito por: {post.author}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* 5. Pagination (Styled exactly as Design 1 Pagination) */}
      {totalPages > 1 && (
        <div id="category-pagination" className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPageNum === 1}
            className={`w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-[#eff3ff] hover:text-[#004ac6] transition-colors cursor-pointer ${
              currentPageNum === 1 ? "opacity-40 cursor-not-allowed hover:bg-transparent hover:text-slate-500" : ""
            }`}
            aria-label="Página anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPageNum(pageNum)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold cursor-pointer transition-colors ${
                currentPageNum === pageNum
                  ? "bg-[#004ac6] text-white"
                  : "border border-slate-200 text-slate-600 hover:bg-[#eff3ff] hover:text-[#004ac6]"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={currentPageNum === totalPages}
            className={`w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-[#eff3ff] hover:text-[#004ac6] transition-colors cursor-pointer ${
              currentPageNum === totalPages ? "opacity-40 cursor-not-allowed hover:bg-transparent hover:text-slate-500" : ""
            }`}
            aria-label="Próxima página"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </motion.div>
  );
}
