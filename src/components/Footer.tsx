/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface FooterProps {
  onNavigateHome: () => void;
}

export default function Footer({ onNavigateHome }: FooterProps) {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigateHome();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0e1c2e] text-white py-12 px-4 md:px-8 border-t border-slate-800 font-sans mt-auto">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand & Copy */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <a
            href="#/"
            id="footer-logo"
            onClick={handleLogoClick}
            className="font-headline-lg text-2xl font-black text-white hover:text-blue-100 tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Radar Tá On
          </a>
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Radar Tá On - Todos os direitos reservados.
          </p>
          <p className="text-xs text-slate-500">
            Parceiro oficial do portal de anúncios locais Tá On Planalto.
          </p>
        </div>

        {/* Links Navigation */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-300 font-medium">
          <a
            href="#/"
            id="footer-lnk-about"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="hover:text-[#fc7728] transition-colors"
          >
            Institucional
          </a>
          <a
            href="#/"
            id="footer-lnk-privacy"
            onClick={(e) => {
              e.preventDefault();
              alert("Política de Privacidade do Radar Tá On:\nNós respeitamos seus dados. Seus e-mails de cadastro do Alerta de Vagas são utilizados apenas para o envio das novas oportunidades e nunca são repassados a terceiros.");
            }}
            className="hover:text-[#fc7728] transition-colors"
          >
            Privacidade
          </a>
          <a
            href="https://www.taonaltiplano.com.br"
            id="footer-lnk-advertise"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#fc7728] transition-colors inline-flex items-center gap-0.5"
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
        </nav>
      </div>
    </footer>
  );
}
