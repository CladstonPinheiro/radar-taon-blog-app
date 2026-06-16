/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from "./supabase";
import { BlogPost, Category } from "../types";

interface SupabasePost {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  image_url: string | null;
  read_time: string | null;
  urgent: boolean;
  published_at: string | null;
  created_at: string;
  blog_profiles: { name: string } | null;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} de ${month}, ${year}`;
}

function mapToBlogPost(row: SupabasePost): BlogPost {
  return {
    id: row.id,
    title: row.title,
    category: row.category as Category,
    summary: row.summary,
    content: row.content,
    imageUrl: row.image_url || "",
    date: formatDate(row.published_at || row.created_at),
    readTime: row.read_time || "3 min de leitura",
    urgent: row.urgent,
    author: row.blog_profiles?.name || "Redação Radar Tá On",
  };
}

export async function fetchPublishedPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, blog_profiles(name)")
    .eq("status", "publicado")
    .order("published_at", { ascending: false });

  if (error || !data) {
    console.error("Erro ao buscar posts:", error);
    return [];
  }

  return (data as unknown as SupabasePost[]).map(mapToBlogPost);
}
