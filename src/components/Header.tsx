/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Category, categoryToSlug } from "../types";
import logoImg from "../assets/radar-logo.png";

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
    <header className="bg-[#0e1c2e] border-b border-slate-800 sticky top-0 z-50 shadow-sm font-sans">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
        {/* Brand Logo */}
        <a
          href="#/"
          id="header-logo"
          onClick={handleLogoClick}
          className="hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
        >
          <img src={logoImg} alt="Radar Tá On" className="h-12 md:h-14 w-auto" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <a
            href="#/"
            id="nav-home"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className={`font-semibold text-sm transition-colors duration-200 pb-1 ${
              currentPage === "home"
                ? "text-[#60a5fa] border-b-2 border-[#60a5fa]"
                : "text-slate-300 hover:text-[#60a5fa]"
            }`}
          >
            Início
          </a>
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
            Tá On Negócios
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger menu */}
        <div className="lg:hidden flex items-center justify-center">
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

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1c2e] border-t border-slate-800 shadow-lg absolute left-0 w-full px-4 py-6 z-50">
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
              Tá On Negócios
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
