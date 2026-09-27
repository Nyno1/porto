// components/UserMenu.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return <div className="h-9 w-9 rounded-full bg-[#1A1A1A] animate-pulse" />;
  }

  if (!session) {
    return (
      <a
        href="/login"
        className="text-sm font-medium text-white bg-[#1A1A1A] hover:bg-[#252525] transition-colors px-4 py-2 rounded-full"
      >
        Login
      </a>
    );
  }

  const initials = session.user.name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-[#1A1A1A] hover:bg-[#141414] transition-colors"
      >
        <div className="h-7 w-7 rounded-full bg-white text-black text-xs font-semibold flex items-center justify-center">
          {initials}
        </div>
        <span className="text-sm text-neutral-200 max-w-[100px] truncate">
          {session.user.name}
        </span>
        <ChevronDown
          size={14}
          className={`text-neutral-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl shadow-xl overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-[#1A1A1A]">
            <p className="text-sm text-white font-medium truncate">{session.user.name}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <p className="text-xs text-neutral-500 truncate">{session.user.email}</p>
              {session.user.role === "ADMIN" && (
                <span className="text-[10px] bg-white/10 text-neutral-300 px-1.5 py-0.5 rounded shrink-0">
                  ADMIN
                </span>
              )}
            </div>
          </div>

          <div className="py-1">
            {session.user.role === "ADMIN" && (

              <a  href="/admin/users"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-300 hover:bg-[#1A1A1A] hover:text-white transition-colors"
              >
                <LayoutDashboard size={16} />
                Dashboard Admin
              </a>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-[#1A1A1A] hover:text-red-300 transition-colors text-left"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
