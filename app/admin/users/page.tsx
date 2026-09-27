"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2 } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Gagal memuat users");
      setUsers(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (id: string, role: "USER" | "ADMIN") => {
    await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    fetchUsers();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin mau hapus user ini?")) return;
    await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white mb-1">Manajemen User</h1>
          <p className="text-neutral-500 text-sm">{users.length} user terdaftar</p>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama/email..."
          className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-lg px-3 py-2 text-sm text-white w-64 focus:outline-none focus:border-neutral-600"
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <div className="border border-[#1A1A1A] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0F0F0F] text-left text-neutral-500 text-xs uppercase tracking-wide">
              <th className="px-5 py-3 font-medium">User</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Bergabung</th>
              <th className="px-5 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]">
            {filtered.map((u) => {
              const initials = u.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
              return (
                <tr key={u.id} className="hover:bg-[#0F0F0F] transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold flex items-center justify-center shrink-0">
                        {initials}
                      </div>
                      <div>
                        <p className="text-white">{u.name}</p>
                        <p className="text-neutral-500 text-xs">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as "USER" | "ADMIN")}
                      className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-md px-2 py-1 text-xs text-white focus:outline-none"
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td className="px-5 py-3 text-neutral-400 text-xs">
                    {new Date(u.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="text-neutral-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-neutral-500 text-sm py-8">Gak ada user ditemukan.</p>
        )}
      </div>
    </div>
  );
}
