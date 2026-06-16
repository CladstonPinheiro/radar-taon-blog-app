/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowRight, Calendar, Clock, ArrowUpRight, Newspaper, Briefcase, Home, Car, TrendingUp, ShieldAlert, CalendarRange, Search } from "lucide-react";
import { BlogPost, Category, getCategoryIcon, categoryToSlug } from "../types";
import CtaAdBox from "./CtaAdBox";
import CategoryIconRow from "./CategoryIconRow";

interface HomePageProps {
  posts: BlogPost[];
  searchQuery: string;
  onNavigateCategory: (category: Category) => void;
  onNavigatePost: (postId: string) => void;
}

export default function HomePage({
  posts,
  searchQuery,
  onNavigateCategory,
  onNavigatePost,
}: HomePageProps) {
  // If search is active, show matching posts instead of standard categorized home
  const isSearching = searchQuery.trim().length > 0;
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Categories list
  const categoriesList = Object.values(Category);

  // Find the primary featured post (e.g. urgent = true, or first NoticiasDF post)
  const featuredPost = posts.find((p) => p.urgent) || posts[0];

  // Group normal posts by category (excluding the main featured post on top so it doesn't duplicate)
  const getRecentPostsByCategory = (category: Category, limit = 2) => {
    return posts
      .filter((p) => p.category === category && p.id !== featuredPost?.id)
      .slice(0, limit);
  };

  // Helper to resolve icon based on Category
  const renderCategoryIcon = (cat: Category) => {
    switch (cat) {
      case Category.NoticiasDF:
        return <Newspaper className="w-5 h-5 text-[#004ac6]" />;
      case Category.Empregos:
        return <Briefcase className="w-5 h-5 text-[#004ac6]" />;
      case Category.ImoveisDF:
        return <Home className="w-5 h-5 text-[#004ac6]" />;
      case Category.Veiculos:
        return <Car className="w-5 h-5 text-[#004ac6]" />;
      case Category.GuiaDeCompras:
        return <Newspaper className="w-5 h-5 text-[#004ac6]" />; // Fallback or standard
      case Category.Negocios:
        return <TrendingUp className="w-5 h-5 text-[#004ac6]" />;
      case Category.SegurancaDigital:
        return <ShieldAlert className="w-5 h-5 text-[#004ac6]" />;
      case Category.AgendaDF:
        return <CalendarRange className="w-5 h-5 text-[#004ac6]" />;
    }
  };

  // Animate transition container
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  if (isSearching) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        id="search-results-section"
        className="flex-grow flex flex-col gap-6"
      >
        <CategoryIconRow onNavigateCategory={onNavigateCategory} />

        <div className="bg-[#eff3ff] rounded-xl p-6 border border-[#c3c6d7]/10 shadow-sm">
          <h1 className="font-headline-xl text-2xl md:text-3xl text-[#004ac6] flex items-center gap-2 font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
            <Search className="w-7 h-7 text-[#fc7728]" />
            Resultados para: "{searchQuery}"
          </h1>
          <p className="text-[#434655] text-sm mt-1">
            Encontramos {filteredPosts.length} {filteredPosts.length === 1 ? "artigo correspondente" : "artigos correspondentes"}.
          </p>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-100 shadow-sm">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-lg text-[#0e1c2e]">Nenhum artigo encontrado</h3>
            <p className="text-[#434655] text-sm mt-1 max-w-sm mx-auto">
              Experimente buscar por outros termos como "empregos", "concurso", "veículos", ou "Brasília".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onNavigatePost(post.id)}
                className="bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-[0_4px_20px_rgba(2,15,33,0.06)] transition-all duration-200 flex flex-col group cursor-pointer"
              >
                <div className="h-48 bg-slate-100 overflow-hidden relative">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#eff3ff] text-[#004ac6] text-xs font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-slate-400 text-xs mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-base font-bold text-[#0e1c2e] mb-2 group-hover:text-[#004ac6] transition-colors line-clamp-2 md:min-h-[48px]">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-xs line-clamp-3 mb-4 flex-grow">
                    {post.summary}
                  </p>
                  <span className="text-xs font-bold text-[#004ac6] flex items-center gap-1 group-hover:underline">
                    Ler artigo completo
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        <CtaAdBox isOrange={true} />
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex-grow flex flex-col gap-8"
    >
      {/* 0. Category icon row (mirrors taonaltiplano.com.br pattern) */}
      <CategoryIconRow onNavigateCategory={onNavigateCategory} />

      {/* 1. Feature Hero News Card (Matches Design 2) */}
      {featuredPost && (
        <section
          id="hero-feature-post"
          onClick={() => onNavigatePost(featuredPost.id)}
          className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group cursor-pointer"
        >
          <div className="relative h-64 md:h-[400px] w-full overflow-hidden bg-slate-50">
            <img
              src={featuredPost.imageUrl}
              alt={featuredPost.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
            />
            {featuredPost.urgent && (
              <div className="absolute top-4 left-4">
                <span className="bg-[#fc7728] text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                  Urgente
                </span>
              </div>
            )}
            <div className="absolute bottom-4 left-4">
              <span className="bg-[#004ac6] text-white font-bold text-xs px-3 py-1 rounded-full shadow-md">
                Destaque do DF
              </span>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-2">
              <span className="text-[#004ac6] text-xs font-black uppercase tracking-wider bg-[#004ac6]/10 px-2.5 py-1 rounded-full">
                {featuredPost.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {featuredPost.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {featuredPost.readTime}
              </span>
            </div>

            <h1
              className="font-headline-xl text-xl md:text-3xl text-[#0e1c2e] font-black group-hover:text-[#004ac6] transition-colors leading-tight mb-3"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {featuredPost.title}
            </h1>
            <p className="font-body-lg text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              {featuredPost.summary}
            </p>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4">
              <div className="text-xs text-slate-400">
                Postado por <span className="font-semibold text-slate-600">{featuredPost.author}</span>
              </div>
              <span className="text-[#004ac6] font-bold text-sm flex items-center gap-1 leading-none hover:underline">
                Ler matéria completa
                <ArrowRight className="w-4 h-4 text-[#004ac6]" />
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Recurrent Promotion CTA Ad Box */}
      <CtaAdBox isOrange={false} />

      {/* 2. Horizontal Categories section */}
      <h2 
        className="text-lg md:text-2xl font-black text-[#0e1c2e] tracking-tight border-b-2 border-[#004ac6]/10 pb-2 mb-2 flex items-center gap-2"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        <Newspaper className="w-6 h-6 text-[#004ac6]" />
        Explorar por Categoria
      </h2>

      {/* Categorized Rows/Lists */}
      <div className="flex flex-col gap-10">
        {categoriesList.map((cat) => {
          const catPosts = getRecentPostsByCategory(cat, 3);
          if (catPosts.length === 0) return null;

          return (
            <section key={cat} className="flex flex-col gap-4">
              {/* Category Header */}
              <div className="flex justify-between items-center border-b border-[#004ac6]/15 pb-2">
                <h3
                  onClick={() => onNavigateCategory(cat)}
                  className="font-headline-md text-base md:text-lg font-bold text-[#0e1c2e] flex items-center gap-2.5 cursor-pointer hover:text-[#004ac6] transition-colors"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  <span className="p-1.5 bg-[#eff3ff] text-[#004ac6] rounded-lg">
                    {renderCategoryIcon(cat)}
                  </span>
                  {cat}
                </h3>
                <button
                  id={`view-all-${categoryToSlug(cat)}`}
                  onClick={() => onNavigateCategory(cat)}
                  className="text-xs font-bold text-[#004ac6] hover:text-[#fc7728] uppercase transition-colors flex items-center gap-1"
                >
                  Ver todos
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Category specific layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {catPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => onNavigatePost(post.id)}
                    className="bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-[0_4px_20px_rgba(2,15,33,0.06)] transition-all duration-200 cursor-pointer flex flex-col group"
                  >
                    <div className="aspect-[16/10] w-full bg-slate-50 relative overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2.5 left-2.5">
                        <span className="bg-white/95 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm backdrop-blur">
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="text-[10px] text-slate-400 font-semibold mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <h4 className="font-headline-md text-sm font-bold text-[#0e1c2e] leading-snug line-clamp-2 mb-2 group-hover:text-[#004ac6] transition-colors flex-grow">
                        {post.title}
                      </h4>
                      <p className="text-slate-500 text-xs line-clamp-2 mb-3">
                        {post.summary}
                      </p>
                      <span className="text-[11px] font-extrabold text-[#004ac6] flex items-center gap-1 group-hover:underline mt-auto">
                        Ler artigo completo
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </motion.div>
  );
}
