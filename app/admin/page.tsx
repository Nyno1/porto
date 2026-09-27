"use client";

import { useState, useEffect } from "react";
import { Users, ShieldCheck, MessageSquare } from "lucide-react";

interface Stats {
  totalUsers: number;
  totalAdmins: number;
  totalComments: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const cards = [
    { label: "Total User", value: stats?.totalUsers, icon: Users },
    { label: "Admin", value: stats?.totalAdmins, icon: ShieldCheck },
    { label: "Total Komentar", value: stats?.totalComments, icon: MessageSquare },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold text-white mb-1">Dashboard</h1>
      <p className="text-neutral-500 text-sm mb-6">Ringkasan aktivitas website kamu</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl p-5 flex items-center gap-4"
          >
            <div className="h-10 w-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-white shrink-0">
              <card.icon size={18} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">
                {card.value ?? "-"}
              </p>
              <p className="text-neutral-500 text-xs">{card.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
