"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { MessageCircle, X, Reply, Trash2 } from "lucide-react";

interface Author {
  id: string;
  name: string;
  role: "USER" | "ADMIN";
}

interface Comment {
  id: string;
  content: string;
  author: Author;
  createdAt: string;
  replies: Comment[];
}

export default function CommentSection({ postSlug }: { postSlug: string }) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?postSlug=${postSlug}`);
      if (!res.ok) throw new Error("Failed to load comments");
      setComments(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }, [postSlug]);

  useEffect(() => {
    if (isOpen) fetchComments();
  }, [isOpen, fetchComments]);

  const handleSubmit = async (e: FormEvent, parentId?: string) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, postSlug, parentId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to post comment");
      }

      setContent("");
      setReplyingTo(null);
      await fetchComments();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin mau hapus komentar ini?")) return;

    try {
      const res = await fetch(`/api/comments/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to delete");
      }
      await fetchComments();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal menghapus komentar");
    }
  };

  const canDelete = (authorId: string) =>
    session?.user?.id === authorId || session?.user?.role === "ADMIN";

  const totalCount = comments.reduce((sum, c) => sum + 1 + c.replies.length, 0);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-white text-black px-4 py-3 shadow-lg hover:scale-105 transition-transform"
      >
        <MessageCircle size={20} />
        <span className="text-sm font-medium">Komentar</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0A0A0A] border border-[#1A1A1A] w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1A1A1A]">
              <h3 className="text-white font-medium">Komentar ({totalCount})</h3>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {comments.length === 0 && (
                <p className="text-neutral-500 text-sm text-center py-8">
                  Belum ada komentar. Jadi yang pertama!
                </p>
              )}

              {comments.map((c) => (
                <div key={c.id} className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-white text-sm font-medium">
                        {c.author.name}
                        {c.author.role === "ADMIN" && (
                          <span className="ml-1.5 text-[10px] bg-white/10 px-1.5 py-0.5 rounded">ADMIN</span>
                        )}
                      </p>
                      <p className="text-neutral-300 text-sm">{c.content}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {session && (
                        <button
                          onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}
                          className="text-neutral-500 hover:text-white"
                        >
                          <Reply size={16} />
                        </button>
                      )}
                      {canDelete(c.author.id) && (
                        <button onClick={() => handleDelete(c.id)} className="text-neutral-500 hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  {c.replies.length > 0 && (
                    <div className="pl-4 border-l border-[#1A1A1A] space-y-2">
                      {c.replies.map((r) => (
                        <div key={r.id} className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-white text-sm font-medium">
                              {r.author.name}
                              {r.author.role === "ADMIN" && (
                                <span className="ml-1.5 text-[10px] bg-white/10 px-1.5 py-0.5 rounded">ADMIN</span>
                              )}
                            </p>
                            <p className="text-neutral-300 text-sm">{r.content}</p>
                          </div>
                          {canDelete(r.author.id) && (
                            <button onClick={() => handleDelete(r.id)} className="text-neutral-500 hover:text-red-500 shrink-0">
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {replyingTo === c.id && (
                    <form onSubmit={(e) => handleSubmit(e, c.id)} className="pl-4 flex flex-col gap-2">
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Balas komentar..."
                        required
                        className="bg-[#111] border border-[#1A1A1A] rounded px-3 py-1.5 text-sm text-white resize-none"
                        rows={2}
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="self-start bg-white text-black text-xs font-medium px-3 py-1.5 rounded"
                      >
                        {isSubmitting ? "Mengirim..." : "Kirim balasan"}
                      </button>
                    </form>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-[#1A1A1A] px-5 py-4">
              {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

              {status === "loading" ? (
                <p className="text-neutral-500 text-sm">Memuat...</p>
              ) : session ? (
                <form onSubmit={(e) => handleSubmit(e)} className="flex gap-2">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={`Komentar sebagai ${session.user.name}...`}
                    required
                    className="flex-1 bg-[#111] border border-[#1A1A1A] rounded px-3 py-2 text-sm text-white resize-none"
                    rows={1}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-white text-black text-sm font-medium px-4 rounded"
                  >
                    Kirim
                  </button>
                </form>
              ) : (
                <p className="text-neutral-400 text-sm text-center">
                  <a href="/login" className="underline text-white">Login</a> dulu buat komentar
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
