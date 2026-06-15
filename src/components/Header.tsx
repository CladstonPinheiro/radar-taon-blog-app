/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Category, categoryToSlug } from "../types";

interface HeaderProps {
  currentCategory: Category | null;
  currentPage: "home" | "category" | "post";
  onNavigateHome: () => void;
  onNavigateCategory: (category: Category) => void;
}

export default function Header({
  currentCategory,
  currentPage,
  onNavigateHome,
  onNavigateCategory,
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
    <header className="bg-white border-b border-[#c3c6d7]/20 sticky top-0 z-50 shadow-sm font-sans">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
        {/* Brand Logo */}
        <a 
          href="#/" 
          id="header-logo"
          onClick={handleLogoClick}
          className="font-headline-lg text-2xl md:text-[32px] font-black text-[#004ac6] tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Radar Tá On
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5">
          <a
            href="#/"
            id="nav-home"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className={`font-semibold text-sm transition-colors duration-200 pb-1 ${
              currentPage === "home"
                ? "text-[#004ac6] border-b-2 border-[#004ac6]"
                : "text-[#434655] hover:text-[#004ac6]"
            }`}
          >
            Início
          </a>
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
                className={`font-semibold text-xs text-[#434655] transition-colors duration-200 pb-1 whitespace-nowrap ${
                  isSelected
                    ? "text-[#004ac6] border-b-2 border-[#004ac6] font-bold"
                    : "hover:text-[#004ac6]"
                }`}
              >
                {cat}
              </a>
            );
          })}
        </nav>

        {/* Action Button CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://www.taonaltiplano.com.br"
            id="btn-back-to-portal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 bg-[#fc7728] hover:bg-[#e05b0d] text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-sm transition-all duration-200"
          >
            Voltar ao Portal de Classificados
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger menu */}
        <div className="lg:hidden flex items-center justify-center">
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-3 text-[#004ac6] hover:bg-slate-50 rounded-lg transition-colors focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#c3c6d7]/30 shadow-lg absolute left-0 w-full px-4 py-6 z-50">
          <div className="flex flex-col gap-4">
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
                  ? "bg-[#eff3ff] text-[#004ac6]"
                  : "text-[#434655] hover:bg-slate-50"
              }`}
            >
              Início
            </a>
            
            <div className="border-b border-[#c3c6d7]/20 my-1"></div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3">Categorias</p>

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
                        ? "bg-[#eff3ff] text-[#004ac6] font-semibold"
                        : "text-[#434655] hover:bg-slate-50"
                    }`}
                  >
                    {cat}
                  </a>
                );
              })}
            </div>

            <div className="border-b border-[#c3c6d7]/20 my-2"></div>

            <a
              href="https://www.taonaltiplano.com.br"
              id="mobile-btn-back-to-portal"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#fc7728] hover:bg-[#e05b0d] text-white font-bold text-center py-3 rounded-lg transition-colors min-h-[44px]"
            >
              Voltar ao Portal de Classificados
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
