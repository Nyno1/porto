"use client";

import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Gagal mendaftar");
      }

      const signInRes = await signIn("credentials", { email, password, redirect: false });
      if (signInRes?.error) throw new Error("Registrasi berhasil, tapi gagal login otomatis");

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#0A0A0A] overflow-hidden">
      <Link
        href="/"
        className="absolute top-6 left-6 z-10 flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Kembali ke Home
      </Link>

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 60%)",
        }}
      />

      <div className="relative w-full max-w-sm bg-[#0F0F0F]/80 backdrop-blur-xl border border-[#1F1F1F] rounded-3xl shadow-2xl p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-12 w-12 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <h1 className="text-white text-lg font-semibold">Sign Up</h1>
          <p className="text-neutral-500 text-sm mt-1">
            Buat akun buat mulai komentar.
          </p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs rounded-lg px-3 py-2 mb-5 text-center">
          Jangan pake akun asli ya ges, nama asli (jangan jorok namanya).
        </div>

        {error && (
          <p className="text-red-400 text-xs text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama"
            required
            className="bg-[#161616] border border-[#242424] rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="bg-[#161616] border border-[#242424] rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 8 karakter)"
            required
            minLength={8}
            className="bg-[#161616] border border-[#242424] rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-black text-sm font-medium py-3 rounded-xl hover:bg-neutral-200 transition-colors mt-1"
          >
            {isSubmitting ? "Mendaftar..." : "Sign up"}
          </button>
        </form>

        <p className="text-center text-neutral-500 text-xs mt-6 relative z-10">
          Udah punya akun?{" "}
          <Link href="/login" className="text-white font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
