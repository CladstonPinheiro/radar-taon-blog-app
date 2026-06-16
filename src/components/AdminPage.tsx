/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { CheckCircle, XCircle, Clock, Eye, LogOut, FileText, X } from "lucide-react";

interface Post {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  image_url: string | null;
  status: string;
  urgent: boolean;
  created_via: string;
  created_at: string;
  read_time: string | null;
  author_id: string;
  blog_profiles: { name: string } | null;
}

interface AdminPageProps {
  onNavigateHome: () => void;
}

export default function AdminPage({ onNavigateHome }: AdminPageProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "pendente_aprovacao" | "rascunho" | "publicado" | "rejeitado" | "todos"
  >("pendente_aprovacao");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [previewPost, setPreviewPost] = useState<Post | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    let query = supabase
      .from("posts")
      .select("*, blog_profiles(name)")
      .order("created_at", { ascending: false });

    if (filter !== "todos") {
      query = query.eq("status", filter);
    }

    const { data, error } = await query;
    if (!error && data) setPosts(data as unknown as Post[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleAction = async (postId: string, newStatus: "publicado" | "rejeitado") => {
    setActionLoading(postId);
    setMessage(null);

    const updates: Record<string, unknown> = { status: newStatus };
    if (newStatus === "publicado") {
      updates.published_at = new Date().toISOString();
    }

    const { error } = await supabase.from("posts").update(updates).eq("id", postId);

    setActionLoading(null);

    if (error) {
      setMessage({ type: "error", text: "Erro ao atualizar post: " + error.message });
      return;
    }

    setMessage({
      type: "success",
      text: newStatus === "publicado" ? "Post publicado!" : "Post rejeitado.",
    });
    setPreviewPost(null);
    fetchPosts();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onNavigateHome();
  };

  const statusLabel: Record<string, { label: string; color: string }> = {
    rascunho: { label: "Rascunho", color: "bg-slate-100 text-slate-600" },
    pendente_aprovacao: { label: "Pendente", color: "bg-yellow-100 text-yellow-700" },
    publicado: { label: "Publicado", color: "bg-green-100 text-green-700" },
    rejeitado: { label: "Rejeitado", color: "bg-red-100 text-red-600" },
  };

  const filters = [
    { key: "pendente_aprovacao", label: "Pendentes" },
    { key: "publicado", label: "Publicados" },
    { key: "rascunho", label: "Rascunhos" },
    { key: "rejeitado", label: "Rejeitados" },
    { key: "todos", label: "Todos" },
  ] as const;

  return (
    <div className="flex-grow flex flex-col py-8 px-4 md:px-8 max-w-[960px] mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#004ac6]" style={{ fontFamily: "Outfit, sans-serif" }}>
            Painel Admin
          </h1>
          <p className="text-sm text-[#434655]">Gerencie e publique os posts do blog</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-[#434655] hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
              filter === f.key
                ? "bg-[#004ac6] text-white border-[#004ac6]"
                : "bg-white text-[#434655] border-[#c3c6d7] hover:border-[#004ac6]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {message && (
        <div
          className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium border ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-[#434655]">
          <Clock className="w-5 h-5 animate-spin mr-2" />
          Carregando posts...
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-[#434655] gap-3">
          <FileText className="w-10 h-10 text-slate-300" />
          <p className="text-sm">Nenhum post encontrado nesta categoria.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl border border-[#c3c6d7]/30 p-5 shadow-sm flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusLabel[post.status]?.color}`}>
                      {statusLabel[post.status]?.label}
                    </span>
                    <span className="text-xs text-slate-400">{post.category}</span>
                    {post.urgent && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-600">
                        Urgente
                      </span>
                    )}
                    {post.created_via === "ia" && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-600">
                        ✨ IA
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-[#0e1c2e] text-base leading-snug">{post.title}</h3>
                  <p className="text-sm text-[#434655] mt-1 line-clamp-2">{post.summary}</p>
                  <p className="text-xs text-slate-400 mt-2">
                    Por {post.blog_profiles?.name || "Autor desconhecido"} •{" "}
                    {new Date(post.created_at).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-[#c3c6d7]/20 flex-wrap">
                <button
                  onClick={() => setPreviewPost(post)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#c3c6d7] text-[#434655] hover:border-[#004ac6] hover:text-[#004ac6] text-sm font-semibold transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Ver
                </button>

                {post.status === "pendente_aprovacao" && (
                  <>
                    <button
                      onClick={() => handleAction(post.id, "publicado")}
                      disabled={actionLoading === post.id}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {actionLoading === post.id ? "Publicando..." : "Publicar"}
                    </button>
                    <button
                      onClick={() => handleAction(post.id, "rejeitado")}
                      disabled={actionLoading === post.id}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 text-sm font-semibold transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Rejeitar
                    </button>
                  </>
                )}

                {post.status === "publicado" && (
                  <button
                    onClick={() => handleAction(post.id, "rejeitado")}
                    disabled={actionLoading === post.id}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 text-sm font-semibold transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Despublicar
                  </button>
                )}

                {post.status === "rejeitado" && (
                  <button
                    onClick={() => handleAction(post.id, "publicado")}
                    disabled={actionLoading === post.id}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Publicar mesmo assim
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Preview */}
      {previewPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white border-b border-[#c3c6d7]/20 px-6 py-4 flex items-center justify-between z-10">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusLabel[previewPost.status]?.color}`}>
                {statusLabel[previewPost.status]?.label}
              </span>
              <button
                onClick={() => setPreviewPost(null)}
                className="text-[#434655] hover:text-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {previewPost.image_url && (
                <img
                  src={previewPost.image_url}
                  alt={previewPost.title}
                  className="w-full h-64 object-cover rounded-xl mb-5"
                />
              )}

              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#004ac6]">
                  {previewPost.category}
                </span>
                {previewPost.urgent && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-600">
                    Urgente
                  </span>
                )}
                {previewPost.read_time && (
                  <span className="text-xs text-slate-400">{previewPost.read_time}</span>
                )}
              </div>

              <h2
                className="text-2xl font-black text-[#0e1c2e] mb-3 leading-tight"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {previewPost.title}
              </h2>

              <p className="text-base text-[#434655] mb-5 font-medium">{previewPost.summary}</p>

              <div className="text-[#0e1c2e] text-sm leading-relaxed whitespace-pre-line">
                {previewPost.content}
              </div>

              <p className="text-xs text-slate-400 mt-6 pt-4 border-t border-[#c3c6d7]/20">
                Por {previewPost.blog_profiles?.name || "Autor desconhecido"} •{" "}
                {new Date(previewPost.created_at).toLocaleDateString("pt-BR")}
              </p>
            </div>

            {previewPost.status === "pendente_aprovacao" && (
              <div className="sticky bottom-0 bg-white border-t border-[#c3c6d7]/20 px-6 py-4 flex gap-3">
                <button
                  onClick={() => handleAction(previewPost.id, "publicado")}
                  disabled={actionLoading === previewPost.id}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Publicar
                </button>
                <button
                  onClick={() => handleAction(previewPost.id, "rejeitado")}
                  disabled={actionLoading === previewPost.id}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 text-sm font-semibold transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Rejeitar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
