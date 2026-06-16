/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Menu, X, ArrowUpRight, Search } from "lucide-react";
import { Category, categoryToSlug } from "../types";
import logoImg from "../assets/radar-logo.png";

interface HeaderProps {
  currentCategory: Category | null;
  currentPage: "home" | "category" | "post" | "login" | "editor" | "admin";
  searchQuery: string;
  onNavigateHome: () => void;
  onNavigateCategory: (category: Category) => void;
  onSearch: (query: string) => void;
}

export default function Header({
  currentCategory,
  currentPage,
  searchQuery,
  onNavigateHome,
  onNavigateCategory,
  onSearch,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = Object.values(Category);

  const handleCategoryClick = (cat: Category) => {
    onNavigateCategory(cat);
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigateHome();
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#0e1c2e] border-b border-slate-800 sticky top-0 z-50 shadow-sm font-sans">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Row 1: logo, horizontal category menu, CTA */}
        <div className="h-20 flex items-center gap-5">
          {/* Brand Logo */}
          <a
            href="#/"
            id="header-logo"
            onClick={handleLogoClick}
            className="hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
          >
            <img src={logoImg} alt="Radar Tá On" className="h-14 md:h-16 w-auto" />
          </a>

          {/* Horizontal category menu (desktop) */}
          <nav className="hidden lg:flex flex-1 items-center gap-5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat, idx) => {
              const isSelected = currentPage === "category" && currentCategory === cat;
              return (
                <a
                  key={cat}
                  id={`nav-cat-${idx}`}
                  href={`#/${categoryToSlug(cat)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(cat);
                  }}
                  className={`font-bold text-xs uppercase tracking-wide transition-colors duration-200 pb-1 whitespace-nowrap shrink-0 ${
                    isSelected
                      ? "text-[#60a5fa] border-b-2 border-[#60a5fa]"
                      : "text-slate-300 hover:text-[#60a5fa]"
                  }`}
                >
                  {cat}
                </a>
              );
            })}
          </nav>

          {/* Action Button CTA */}
          <a
            href="https://www.taonaltiplano.com.br"
            id="btn-back-to-portal"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center justify-center gap-1.5 bg-[#fc7728] hover:bg-[#e05b0d] text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-sm transition-all duration-200 whitespace-nowrap shrink-0"
          >
            Ir para o Tá On Negócios
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {/* Mobile Hamburger menu */}
          <div className="lg:hidden flex items-center justify-center ml-auto">
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Row 2: search bar (desktop) */}
        <div className="hidden lg:block pb-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Buscar notícias..."
              className="w-full bg-white rounded-full py-2.5 pl-4 pr-10 text-sm text-[#0e1c2e] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#fc7728]/40 transition-shadow"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1c2e] border-t border-slate-800 shadow-lg absolute left-0 w-full px-4 py-6 z-50">
          <div className="flex flex-col gap-4">
            <div className="relative w-full mb-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Buscar notícias..."
                className="w-full bg-white/10 border border-white/10 rounded-lg py-2.5 pl-4 pr-10 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#fc7728]/40"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <a
              href="#/"
              id="mobile-nav-home"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
                setMobileMenuOpen(false);
              }}
              className={`font-bold text-base py-2.5 px-3 rounded-lg transition-colors min-h-[44px] flex items-center ${
                currentPage === "home"
                  ? "bg-white/10 text-[#60a5fa]"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              Início
            </a>

            <div className="border-b border-slate-800 my-1"></div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-3">Categorias</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map((cat) => {
                const isSelected = currentPage === "category" && currentCategory === cat;
                return (
                  <a
                    key={cat}
                    id={`mobile-nav-cat-${categoryToSlug(cat)}`}
                    href={`#/${categoryToSlug(cat)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(cat);
                    }}
                    className={`text-sm py-2 px-3 rounded-lg font-medium transition-colors min-h-[44px] flex items-center ${
                      isSelected
                        ? "bg-white/10 text-[#60a5fa] font-semibold"
                        : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    {cat}
                  </a>
                );
              })}
            </div>

            <div className="border-b border-slate-800 my-2"></div>

            <a
              href="https://www.taonaltiplano.com.br"
              id="mobile-btn-back-to-portal"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#fc7728] hover:bg-[#e05b0d] text-white font-bold text-center py-3 rounded-lg transition-colors min-h-[44px]"
            >
              Ir para o Tá On Negócios
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
