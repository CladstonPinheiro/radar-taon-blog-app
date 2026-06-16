/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Newspaper, Briefcase, Home, Car, TrendingUp, ShieldAlert, CalendarRange } from "lucide-react";
import { Category } from "../types";

interface CategoryIconRowProps {
  onNavigateCategory: (category: Category) => void;
}

export default function CategoryIconRow({ onNavigateCategory }: CategoryIconRowProps) {
  const categories = Object.values(Category);

  const renderIcon = (cat: Category) => {
    switch (cat) {
      case Category.NoticiasDF:
        return <Newspaper className="w-5 h-5" />;
      case Category.Empregos:
        return <Briefcase className="w-5 h-5" />;
      case Category.ImoveisDF:
        return <Home className="w-5 h-5" />;
      case Category.Veiculos:
        return <Car className="w-5 h-5" />;
      case Category.GuiaDeCompras:
        return <Newspaper className="w-5 h-5" />;
      case Category.Negocios:
        return <TrendingUp className="w-5 h-5" />;
      case Category.SegurancaDigital:
        return <ShieldAlert className="w-5 h-5" />;
      case Category.AgendaDF:
        return <CalendarRange className="w-5 h-5" />;
      default:
        return <Newspaper className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="category-icon-row"
      className="bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-5"
    >
      <div className="flex items-center gap-6 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onNavigateCategory(cat)}
            className="flex flex-col items-center gap-2 shrink-0 group min-w-[76px]"
          >
            <span className="w-14 h-14 rounded-full bg-[#eff3ff] text-[#004ac6] flex items-center justify-center border border-[#004ac6]/10 group-hover:bg-[#004ac6] group-hover:text-white transition-colors duration-200">
              {renderIcon(cat)}
            </span>
            <span className="text-[11px] font-semibold text-[#434655] text-center leading-tight group-hover:text-[#004ac6] transition-colors">
              {cat}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
