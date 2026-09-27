"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2 } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  postSlug: string;
  createdAt: string;
  author: { name: string; email: string };
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/comments");
      if (!res.ok) throw new Error("Gagal memuat komentar");
      setComments(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin mau hapus komentar ini?")) return;
    await fetch(`/api/comments/${id}`, { method: "DELETE" });
    fetchComments();
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-white mb-1">Manajemen Komentar</h1>
      <p className="text-neutral-500 text-sm mb-6">{comments.length} komentar total</p>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <div className="space-y-3">
        {comments.map((c) => (
          <div
            key={c.id}
            className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl p-4 flex items-start justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-white text-sm font-medium">{c.author.name}</p>
                <span className="text-neutral-600 text-xs">.</span>
                <p className="text-neutral-500 text-xs">
                  {new Date(c.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <span className="text-neutral-600 text-xs">.</span>
                <p className="text-neutral-500 text-xs">{c.postSlug}</p>
              </div>
              <p className="text-neutral-300 text-sm">{c.content}</p>
            </div>
            <button
              onClick={() => handleDelete(c.id)}
              className="text-neutral-500 hover:text-red-500 transition-colors shrink-0"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-center text-neutral-500 text-sm py-8">Belum ada komentar.</p>
        )}
      </div>
    </div>
  );
}
