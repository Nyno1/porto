import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LayoutDashboard, Users, MessageSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Comments", href: "/admin/comments", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      <aside className="w-64 shrink-0 border-r border-[#1A1A1A] flex flex-col">
        <div className="px-5 py-5 border-b border-[#1A1A1A]">
          <p className="text-white font-semibold">Admin Panel</p>
          <p className="text-neutral-500 text-xs mt-0.5">{session.user.email}</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-[#141414] transition-colors"
            >
              <item.icon size={17} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-[#1A1A1A] space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-[#141414] transition-colors"
          >
            <ArrowLeft size={17} />
            Kembali ke Situs
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
