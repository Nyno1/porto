"use client";

import {
  useEffect,
  useState,
  type JSX,
  type ReactNode,
  type SVGProps,
} from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function iconBase({ size = 20, strokeWidth = 1.75, className, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    ...rest,
  };
}

const HomeIcon = (props: IconProps) => (
  <svg {...iconBase(props)}>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5.5 10v9a1 1 0 0 0 1 1H10v-5.5a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2V20h3.5a1 1 0 0 0 1-1v-9" />
  </svg>
);

const UserIcon = (props: IconProps) => (
  <svg {...iconBase(props)}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20c1-3.5 4-5.5 7.5-5.5s6.5 2 7.5 5.5" />
  </svg>
);

const ZapIcon = (props: IconProps) => (
  <svg {...iconBase(props)}>
    <path d="M12 3 4.5 13.5H11L9.5 21 19 9.5h-6.5L14 3z" />
  </svg>
);

const FolderIcon = (props: IconProps) => (
  <svg {...iconBase(props)}>
    <path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h4l2 2.5h8A1.5 1.5 0 0 1 20.5 9v8A1.5 1.5 0 0 1 19 18.5H5A1.5 1.5 0 0 1 3.5 17z" />
  </svg>
);

const BriefcaseIcon = (props: IconProps) => (
  <svg {...iconBase(props)}>
    <rect x="3.5" y="7.5" width="17" height="11" rx="1.5" />
    <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" />
    <path d="M3.5 12.5h17" />
  </svg>
);

const AwardIcon = (props: IconProps) => (
  <svg {...iconBase(props)}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="M9 13.5 7.5 21l4.5-2.5 4.5 2.5-1.5-7.5" />
  </svg>
);

const MenuIcon = (props: IconProps) => (
  <svg {...iconBase(props)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

const XIcon = (props: IconProps) => (
  <svg {...iconBase(props)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export interface NavItem {
  name: string;
  link: string;
}

const ICON_BY_NAME: Record<string, (props: IconProps) => JSX.Element> = {
  Home: HomeIcon,
  About: UserIcon,
  Skill: ZapIcon,
  Project: FolderIcon,
  Experience: BriefcaseIcon,
  Certification: AwardIcon,
};

export function Navbar({ children }: { children: ReactNode }) {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">{children}</div>
    </header>
  );
}

export function NavBody({ children }: { children: ReactNode }) {
  return (
    <div className="hidden md:flex items-center justify-between gap-6 rounded-full border border-white/10 bg-black/80 px-4 py-2 mt-4 backdrop-blur-md">
      {children}
    </div>
  );
}

export function NavItems({ items }: { items: NavItem[] }) {
  const [active, setActive] = useScrollSpy(items);
  return <IconPill items={items} active={active} onSelect={setActive} size={17} circle={36} gap="gap-0.5" />;
}

export function NavbarLogo() {
  return (
    <a href="#home" className="text-sm font-semibold tracking-tight text-white">
      Nyno<span className="text-neutral-500">.dev</span>
    </a>
  );
}

export function NavbarButton({
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}) {
  const base =
    variant === "primary"
      ? "bg-white text-black hover:bg-neutral-200"
      : "bg-transparent text-white border border-white/20 hover:border-white/40";
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${base} ${className}`}
    >
      {children}
    </button>
  );
}

export function MobileNav({ children }: { children: ReactNode }) {
  return <div className="md:hidden">{children}</div>;
}

export function MobileNavHeader({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/80 px-4 py-3 mt-4 backdrop-blur-md">
      {children}
    </div>
  );
}

export function MobileNavToggle({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="flex h-9 w-9 items-center justify-center rounded-full text-white"
    >
      {isOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
    </button>
  );
}

export function MobileNavMenu({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const items = flattenNavLinks(children);
  const [active, setActive] = useScrollSpy(items);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Primary"
      data-open={isOpen}
      className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-5"
    >
      <IconPill
        items={items}
        active={active}
        onSelect={(link) => {
          setActive(link);
          onClose();
        }}
        size={22}
        circle={56}
        gap="gap-1"
        className="w-full max-w-md justify-between"
      />
    </nav>
  );
}

function useScrollSpy(items: NavItem[]): [string, (link: string) => void] {
  const [active, setActive] = useState<string>(items[0]?.link ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.link.replace("#", "")))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [active, setActive];
}

function IconPill({
  items,
  active,
  onSelect,
  size,
  circle,
  gap = "gap-1",
  className = "",
}: {
  items: NavItem[];
  active: string;
  onSelect: (link: string) => void;
  size: number;
  circle: number;
  gap?: string;
  className?: string;
}) {
  return (
    <ul
      className={`flex items-center ${gap} rounded-full bg-black px-3 py-2 shadow-lg ${className}`}
    >
      {items.map((item) => {
        const Icon = ICON_BY_NAME[item.name] ?? HomeIcon;
        const isActive = item.link === active;
        return (
          <li key={item.link}>
            <a
              href={item.link}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.name}
              onClick={() => onSelect(item.link)}
              style={{ height: circle, width: circle }}
              className={`flex items-center justify-center rounded-full transition-colors duration-200 ${
                isActive ? "bg-white" : "bg-transparent"
              }`}
            >
              <Icon
                size={size}
                strokeWidth={1.75}
                className={isActive ? "text-black" : "text-white"}
                aria-hidden="true"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function flattenNavLinks(children: ReactNode): NavItem[] {
  const result: NavItem[] = [];
  const nodes = Array.isArray(children) ? children : [children];

  for (const node of nodes) {
    if (
      node &&
      typeof node === "object" &&
      "props" in node &&
      typeof (node as { props?: { href?: string } }).props?.href === "string"
    ) {
      const props = (node as { props: { href: string; children?: ReactNode } }).props;
      const label = extractText(props.children) ?? props.href.replace("#", "");
      result.push({ name: label, link: props.href });
    }
  }
  return result;
}

function extractText(node: ReactNode): string | null {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) {
    for (const child of node) {
      const text = extractText(child);
      if (text) return text;
    }
    return null;
  }
  if (node && typeof node === "object" && "props" in node) {
    return extractText((node as { props?: { children?: ReactNode } }).props?.children ?? null);
  }
  return null;
}