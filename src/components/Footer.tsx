/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Category, categoryToSlug } from "../types";
import logoImg from "../assets/radar-logo.png";

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateCategory: (category: Category) => void;
}

export default function Footer({ onNavigateHome, onNavigateCategory }: FooterProps) {
  const categories = Object.values(Category);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigateHome();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0e1c2e] text-white pt-12 pb-8 px-4 md:px-8 border-t border-slate-800 font-sans mt-auto">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Brand */}
        <div className="flex flex-col gap-3">
          <a
            href="#/"
            id="footer-logo"
            onClick={handleLogoClick}
            className="hover:opacity-90 transition-opacity inline-block"
          >
            <img src={logoImg} alt="Radar Tá On" className="h-14 w-auto" />
          </a>
          <p className="text-slate-400 text-sm leading-relaxed">
            Seu portal de notícias, oportunidades e novidades da capital federal.
          </p>
          <p className="text-xs text-slate-500">
            Parceiro oficial do portal de anúncios locais Tá On Planalto.
          </p>
        </div>

        {/* Column 2: Categorias */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold uppercase tracking-wide text-slate-300">Categorias</h4>
          <nav className="flex flex-col gap-2 text-sm text-slate-400">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`#/${categoryToSlug(cat)}`}
                id={`footer-cat-${categoryToSlug(cat)}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateCategory(cat);
                }}
                className="hover:text-[#fc7728] transition-colors"
              >
                {cat}
              </a>
            ))}
          </nav>
        </div>

        {/* Column 3: Institucional */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold uppercase tracking-wide text-slate-300">Institucional</h4>
          <nav className="flex flex-col gap-2 text-sm text-slate-400">
            <a
              href="#/"
              id="footer-lnk-home"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="hover:text-[#fc7728] transition-colors"
            >
              Início
            </a>
            <a
              href="#/"
              id="footer-lnk-privacy"
              onClick={(e) => {
                e.preventDefault();
                alert(
                  "Política de Privacidade do Radar Tá On:\nNós respeitamos seus dados. Seus e-mails de cadastro do Alerta de Vagas são utilizados apenas para o envio das novas oportunidades e nunca são repassados a terceiros."
                );
              }}
              className="hover:text-[#fc7728] transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="https://www.taonaltiplano.com.br"
              id="footer-lnk-advertise"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#fc7728] transition-colors"
            >
              Anuncie no Portal
            </a>
            <a
              href="https://www.taonaltiplano.com.br"
              id="footer-lnk-portal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#fc7728] transition-colors"
            >
              Portal de Classificados
            </a>
            <a
              href="#/admin"
              id="footer-lnk-admin"
              className="hover:text-[#fc7728] transition-colors"
            >
              Painel Admin
            </a>
          </nav>
        </div>

        {/* Column 4: Contato */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold uppercase tracking-wide text-slate-300">Fale Conosco</h4>
          <div className="flex flex-col gap-2.5 text-sm text-slate-400">
            <a
              href="mailto:comercial@taonaltiplano.com.br"
              className="flex items-center gap-2 hover:text-[#fc7728] transition-colors"
            >
              <Mail className="w-4 h-4 shrink-0" />
              comercial@taonaltiplano.com.br
            </a>
            <a
              href="tel:+5561993775651"
              className="flex items-center gap-2 hover:text-[#fc7728] transition-colors"
            >
              <Phone className="w-4 h-4 shrink-0" />
              (61) 99377-5651
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" />
              Altiplano Leste, Brasília - DF
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1280px] mx-auto mt-10 pt-6 border-t border-slate-800 text-center">
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} Radar Tá On - Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
