/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import { Category } from "../types";
import { Sparkles, PenLine, Send, LogOut, Upload, X } from "lucide-react";

interface EditorPageProps {
  onNavigateHome: () => void;
}

export default function EditorPage({ onNavigateHome }: EditorPageProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>(Category.NoticiasDF);
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [createdVia, setCreatedVia] = useState<"manual" | "ia">("manual");
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState<"rascunho" | "pendente_aprovacao" | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [showAiModal, setShowAiModal] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = Object.values(Category);

  const generateSlug = (text: string) => {
    return (
      text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .slice(0, 80) +
      "-" +
      Date.now()
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    setMessage(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMessage({ type: "error", text: "Sessão expirada. Faça login novamente." });
      setImageUploading(false);
      return;
    }

    const ext = file.name.split(".").pop();
    const fileName = `${user.id}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, file, { upsert: false });

    if (error) {
      setMessage({ type: "error", text: "Erro ao fazer upload: " + error.message });
      setImageUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(fileName);

    setImageUrl(urlData.publicUrl);
    setImagePreview(urlData.publicUrl);
    setImageUploading(false);
    setMessage({ type: "success", text: "Imagem enviada com sucesso!" });
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleGenerateWithAI = async () => {
    if (!aiTopic.trim()) return;
    setAiLoading(true);
    setShowAiModal(false);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Crie um rascunho de post para o blog "Radar Tá On" sobre o seguinte tema: "${aiTopic}".
              Categoria: ${category}

              Responda SOMENTE com um JSON válido no formato:
              {
                "title": "título do post",
                "summary": "resumo em 1-2 frases",
                "content": "conteúdo do post em 3-4 parágrafos"
              }

              Escreva em português brasileiro, tom informativo e regional (Brasília/DF).`,
            },
          ],
        }),
      });

      const data = await response.json();
      const text = data.content?.[0]?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      setTitle(parsed.title || "");
      setSummary(parsed.summary || "");
      setContent(parsed.content || "");
      setCreatedVia("ia");
      setMessage({ type: "success", text: "Rascunho gerado pela IA! Revise antes de enviar." });
    } catch {
      setMessage({ type: "error", text: "Erro ao gerar conteúdo. Tente novamente." });
    }

    setAiLoading(false);
  };

  const handleSubmit = async (status: "rascunho" | "pendente_aprovacao") => {
    if (!title.trim() || !summary.trim() || !content.trim()) {
      setMessage({ type: "error", text: "Preencha título, resumo e conteúdo." });
      return;
    }

    setLoading(true);
    setLoadingAction(status);
    setMessage(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMessage({ type: "error", text: "Sessão expirada. Faça login novamente." });
      setLoading(false);
      setLoadingAction(null);
      return;
    }

    const slug = generateSlug(title);

    const { error } = await supabase.from("posts").insert({
      title: title.trim(),
      slug,
      category,
      summary: summary.trim(),
      content: content.trim(),
      image_url: imageUrl || null,
      author_id: user.id,
      status,
      urgent,
      created_via: createdVia,
      read_time: `${Math.ceil(content.split(" ").length / 200)} min de leitura`,
    });

    setLoading(false);
    setLoadingAction(null);

    if (error) {
      setMessage({ type: "error", text: "Erro ao salvar post: " + error.message });
      return;
    }

    setMessage({
      type: "success",
      text: status === "rascunho" ? "Rascunho salvo!" : "Post enviado para aprovação!",
    });
    setTitle("");
    setSummary("");
    setContent("");
    setImageUrl("");
    setImagePreview(null);
    setUrgent(false);
    setCreatedVia("manual");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onNavigateHome();
  };

  return (
    <div className="flex-grow flex flex-col py-8 px-4 md:px-8 max-w-[860px] mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#004ac6]" style={{ fontFamily: "Outfit, sans-serif" }}>
            Novo Post
          </h1>
          <p className="text-sm text-[#434655]">Crie um rascunho ou envie para aprovação</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-[#434655] hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => {
            setCreatedVia("manual");
            setMessage(null);
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
            createdVia === "manual"
              ? "bg-[#004ac6] text-white border-[#004ac6]"
              : "bg-white text-[#434655] border-[#c3c6d7] hover:border-[#004ac6]"
          }`}
        >
          <PenLine className="w-4 h-4" />
          Escrever do zero
        </button>
        <button
          onClick={() => setShowAiModal(true)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
            createdVia === "ia"
              ? "bg-[#fc7728] text-white border-[#fc7728]"
              : "bg-white text-[#434655] border-[#c3c6d7] hover:border-[#fc7728]"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          {aiLoading ? "Gerando..." : "Gerar com IA"}
        </button>
      </div>

      {showAiModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl mx-4">
            <h2 className="text-lg font-black text-[#004ac6] mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
              Gerar rascunho com IA
            </h2>
            <p className="text-sm text-[#434655] mb-4">
              Descreva o tema ou pauta do post. A IA vai gerar título, resumo e conteúdo inicial.
            </p>
            <textarea
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              placeholder="Ex: Novos investimentos em mobilidade urbana no DF..."
              className="w-full border border-[#c3c6d7] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#004ac6]/30 resize-none"
              rows={4}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowAiModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-[#c3c6d7] text-sm font-semibold text-[#434655] hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleGenerateWithAI}
                disabled={!aiTopic.trim()}
                className="flex-1 py-2.5 rounded-lg bg-[#fc7728] hover:bg-[#e05b0d] disabled:opacity-50 text-white text-sm font-semibold transition-colors"
              >
                Gerar
              </button>
            </div>
          </div>
        </div>
      )}

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

      <div className="flex flex-col gap-4 bg-white rounded-2xl border border-[#c3c6d7]/30 p-6 shadow-sm">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#434655]">Título *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do post"
            className="border border-[#c3c6d7] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#004ac6]/30"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#434655]">Categoria *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-[#c3c6d7] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#004ac6]/30"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#434655]">Resumo *</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Resumo em 1-2 frases para aparecer na listagem"
            className="border border-[#c3c6d7] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#004ac6]/30 resize-none"
            rows={2}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#434655]">Conteúdo *</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Conteúdo completo do post..."
            className="border border-[#c3c6d7] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#004ac6]/30 resize-none"
            rows={12}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#434655]">Imagem de destaque</label>
          {imagePreview ? (
            <div className="relative rounded-lg overflow-hidden border border-[#c3c6d7]">
              <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow transition-colors"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={imageUploading}
              className="flex items-center justify-center gap-2 border-2 border-dashed border-[#c3c6d7] rounded-lg py-8 text-sm text-[#434655] hover:border-[#004ac6] hover:text-[#004ac6] transition-colors disabled:opacity-50"
            >
              <Upload className="w-5 h-5" />
              {imageUploading ? "Enviando..." : "Clique para fazer upload da imagem"}
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageUpload}
            className="hidden"
          />
          <p className="text-xs text-slate-400">JPG, PNG ou WebP — máximo 5 MB</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="urgent"
            checked={urgent}
            onChange={(e) => setUrgent(e.target.checked)}
            className="w-4 h-4 accent-[#fc7728]"
          />
          <label htmlFor="urgent" className="text-sm font-semibold text-[#434655]">
            Marcar como urgente
          </label>
        </div>

        <div className="flex gap-3 pt-2 border-t border-[#c3c6d7]/20 mt-2">
          <button
            onClick={() => handleSubmit("rascunho")}
            disabled={loading}
            className="flex-1 py-2.5 rounded-lg border border-[#c3c6d7] text-sm font-semibold text-[#434655] hover:bg-slate-50 disabled:opacity-50 transition-colors"
          >
            {loadingAction === "rascunho" ? "Salvando..." : "Salvar rascunho"}
          </button>
          <button
            onClick={() => handleSubmit("pendente_aprovacao")}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#004ac6] hover:bg-[#003a9e] disabled:opacity-50 text-white text-sm font-semibold transition-colors"
          >
            <Send className="w-4 h-4" />
            {loadingAction === "pendente_aprovacao" ? "Enviando..." : "Enviar para aprovação"}
          </button>
        </div>
      </div>
    </div>
  );
}
