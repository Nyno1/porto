"use client";

import { useState, useEffect, useCallback, FormEvent, useRef } from "react";
import { useSession } from "next-auth/react";
import {
  MessageCircle,
  X,
  Reply,
  Trash2,
  Heart,
  Send,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Loader2,
} from "lucide-react";

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

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string): string {
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-indigo-500",
    "bg-red-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return "baru saja";
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} hari lalu`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)} minggu lalu`;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-7 h-7 text-[10px]",
    md: "w-9 h-9 text-xs",
    lg: "w-11 h-11 text-sm",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${getAvatarColor(name)} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 select-none`}
    >
      {getInitials(name)}
    </div>
  );
}

function DeleteConfirmModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 max-w-sm w-full">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={20} className="text-red-400" />
        </div>
        <h3 className="text-white font-semibold text-center mb-2">Hapus Komentar?</h3>
        <p className="text-neutral-400 text-sm text-center mb-6">
          Komentar yang dihapus tidak bisa dikembalikan.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#2A2A2A] text-neutral-300 text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

function CommentItem({
  comment,
  session,
  onReply,
  onDelete,
  depth = 0,
}: {
  comment: Comment;
  session: any;
  onReply: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  depth?: number;
}) {
  const [showReplies, setShowReplies] = useState(depth < 2);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const canDelete = session?.user?.id === comment.author.id || session?.user?.role === "ADMIN";

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className={`${depth > 0 ? "ml-4 sm:ml-6 pl-3 sm:pl-4 border-l border-[#1A1A1A]" : ""}`}>
      <div className="group py-3">
        <div className="flex gap-3">
          <Avatar name={comment.author.name} size={depth > 0 ? "sm" : "md"} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white text-sm font-semibold">{comment.author.name}</span>
              {comment.author.role === "ADMIN" && (
                <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-semibold tracking-wide">
                  ADMIN
                </span>
              )}
              <span className="text-neutral-500 text-[10px]">{timeAgo(comment.createdAt)}</span>
            </div>
            <p className="text-neutral-300 text-sm mt-1 leading-relaxed break-words">{comment.content}</p>

            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 text-[11px] transition-colors ${
                  liked ? "text-red-400" : "text-neutral-500 hover:text-red-400"
                }`}
              >
                <Heart size={12} fill={liked ? "currentColor" : "none"} />
                {likeCount > 0 && <span>{likeCount}</span>}
              </button>
              {session && depth < 3 && (
                <button
                  onClick={() => onReply(comment.id, comment.author.name)}
                  className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-white transition-colors"
                >
                  <Reply size={12} />
                  <span>Balas</span>
                </button>
              )}
              {canDelete && (
                <button
                  onClick={() => onDelete(comment.id)}
                  className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={12} />
                  <span>Hapus</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {comment.replies.length > 0 && (
        <div className="mt-1">
          {comment.replies.length > 2 && !showReplies && (
            <button
              onClick={() => setShowReplies(true)}
              className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 ml-4 sm:ml-6 mb-2"
            >
              <ChevronDown size={12} />
              Lihat {comment.replies.length} balasan
            </button>
          )}
          {showReplies && (
            <>
              {(comment.replies.length > 2 ? comment.replies.slice(-2) : comment.replies).map(
                (reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    session={session}
                    onReply={onReply}
                    onDelete={onDelete}
                    depth={depth + 1}
                  />
                )
              )}
              {comment.replies.length > 2 && (
                <button
                  onClick={() => setShowReplies(false)}
                  className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-white ml-4 sm:ml-6 mt-1"
                >
                  <ChevronUp size={12} />
                  Sembunyikan balasan
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function CommentSection({ postSlug }: { postSlug: string }) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyingToName, setReplyingToName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?postSlug=${postSlug}`);
      if (!res.ok) throw new Error("Gagal memuat komentar");
      setComments(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  }, [postSlug]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetchComments();
    }
  }, [isOpen, fetchComments]);

  const handleSubmit = async (e: FormEvent, parentId?: string) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim(), postSlug, parentId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Gagal mengirim komentar");
      }

      setContent("");
      setReplyingTo(null);
      setReplyingToName("");
      await fetchComments();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/comments/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Gagal menghapus");
      }
      setDeleteTarget(null);
      await fetchComments();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus komentar");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReply = (id: string, name: string) => {
    setReplyingTo(id);
    setReplyingToName(name);
    textareaRef.current?.focus();
  };

  const totalCount = comments.reduce((sum, c) => sum + 1 + c.replies.length, 0);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 rounded-full bg-white text-black px-3 py-2.5 sm:px-4 sm:py-3 shadow-lg"
      >
        <MessageCircle size={18} />
        <span className="text-xs sm:text-sm font-semibold">Komentar</span>
        {totalCount > 0 && (
          <span className="bg-blue-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {totalCount > 99 ? "99+" : totalCount}
          </span>
        )}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative bg-[#0A0A0A] border border-[#1A1A1A] w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[85vh] sm:max-h-[80vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-[#1A1A1A] bg-[#0D0D0D]">
              <div className="flex items-center gap-2">
                <MessageCircle size={18} className="text-blue-400" />
                <h3 className="text-white font-semibold text-sm sm:text-base">Komentar</h3>
                {totalCount > 0 && (
                  <span className="bg-white/10 text-neutral-300 text-[10px] font-medium px-2 py-0.5 rounded-full">
                    {totalCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Comment List */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3 sm:py-4">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <Loader2 size={24} className="text-blue-400 animate-spin" />
                  <p className="text-neutral-500 text-sm">Memuat komentar...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                    <AlertCircle size={20} className="text-red-400" />
                  </div>
                  <p className="text-red-400 text-sm text-center">{error}</p>
                  <button onClick={fetchComments} className="text-blue-400 text-xs font-medium hover:underline">
                    Coba lagi
                  </button>
                </div>
              ) : comments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
                    <MessageCircle size={24} className="text-neutral-600" />
                  </div>
                  <p className="text-neutral-400 text-sm font-medium">Belum ada komentar</p>
                  <p className="text-neutral-600 text-xs">Jadilah yang pertama berkomentar!</p>
                </div>
              ) : (
                <div className="divide-y divide-[#1A1A1A]">
                  {comments.map((c) => (
                    <CommentItem
                      key={c.id}
                      comment={c}
                      session={session}
                      onReply={handleReply}
                      onDelete={(id) => setDeleteTarget(id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Reply indicator */}
            {replyingTo && (
              <div className="px-4 sm:px-5 py-2 bg-blue-500/5 border-t border-blue-500/10 flex items-center justify-between">
                <p className="text-blue-400 text-xs truncate">
                  Membalas <span className="font-semibold">@{replyingToName}</span>
                </p>
                <button
                  onClick={() => { setReplyingTo(null); setReplyingToName(""); }}
                  className="text-neutral-500 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-[#1A1A1A] px-4 sm:px-5 py-3 sm:py-4 bg-[#0D0D0D]">
              {error && (
                <div className="flex items-center gap-2 text-red-400 text-xs mb-2 bg-red-500/10 px-3 py-2 rounded-lg">
                  <AlertCircle size={12} />
                  {error}
                </div>
              )}

              {status === "loading" ? (
                <div className="flex items-center gap-2 text-neutral-500 text-sm py-2">
                  <Loader2 size={14} className="animate-spin" />
                  Memuat...
                </div>
              ) : session ? (
                <form onSubmit={(e) => handleSubmit(e, replyingTo ?? undefined)}>
                  <div className="flex gap-2">
                    <Avatar name={session.user?.name ?? "U"} size="sm" />
                    <div className="flex-1 flex gap-2">
                      <textarea
                        ref={textareaRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={replyingTo ? `Balas ${replyingToName}...` : `Komentar sebagai ${session.user?.name}...`}
                        required
                        rows={1}
                        maxLength={500}
                        className="flex-1 bg-[#111111] border border-[#2A2A2A] rounded-xl px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-neutral-600"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e, replyingTo ?? undefined);
                          }
                        }}
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting || !content.trim()}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-black hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1.5 ml-9">
                    <p className="text-[10px] text-neutral-600">Enter untuk kirim · Shift+Enter untuk baris baru</p>
                    <p className="text-[10px] text-neutral-600">{content.length}/500</p>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center gap-2 py-2">
                  <p className="text-neutral-400 text-sm">
                    <a href="/login" className="text-blue-400 font-medium hover:underline">Login</a> untuk berkomentar
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {isDeleting && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 flex flex-col items-center gap-3">
            <Loader2 size={24} className="text-blue-400 animate-spin" />
            <p className="text-neutral-300 text-sm">Menghapus komentar...</p>
          </div>
        </div>
      )}
    </>
  );
}
