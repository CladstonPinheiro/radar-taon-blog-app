/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Megaphone } from "lucide-react";

interface CtaAdBoxProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  isOrange?: boolean;
}

export default function CtaAdBox({
  title = "Anuncie grátis no Tá On Anúncios",
  subtitle = "Quer vender um imóvel, veículo, oferecer uma vaga de emprego ou divulgar seus serviços no Distrito Federal? Faça como milhares de pessoas e mude seu rumo comercial agora.",
  buttonText = "Criar meu Anúncio Grátis",
  isOrange = false,
}: CtaAdBoxProps) {
  return (
    <div className={`my-10 relative overflow-hidden rounded-xl p-6 md:p-8 border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 ${
      isOrange 
        ? "bg-[#fc7728]/5 border-[#fc7728]/20" 
        : "bg-gradient-to-r from-[#eff3ff] to-[#d5e3fd] border-[#004ac6]/10"
    }`}>
      {/* Dynamic background blur blobs */}
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#fc7728]/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-[#004ac6]/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex-1 relative z-10 text-center md:text-left">
        <h3 
          className="font-headline-md text-lg md:text-xl font-bold text-[#0e1c2e] mb-2 flex items-center justify-center md:justify-start gap-2"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          <Megaphone className="w-5 h-5 text-[#fc7728] shrink-0" />
          {title}
        </h3>
        <p className="text-sm text-[#434655] max-w-xl leading-relaxed">
          {subtitle}
        </p>
      </div>

      <a
        href="https://www.taonaltiplano.com.br"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 relative z-10 inline-flex items-center justify-center gap-2 bg-[#fc7728] hover:bg-[#e05b0d] text-white font-bold text-sm px-6 py-3.5 rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-0.5 min-h-[44px]"
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-4 h-4 text-white" />
      </a>
    </div>
  );
}
