"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="px-30 bg-white">
      <div className="flex items-center h-15 justify-between border-b border-border">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/logo.svg"
            alt="logo image"
            width={42}
            height={16}
            className="translate-y-[3px] "
          />
          <span className="text-sm font-bold">Samil AC</span>
        </Link>
        {/* 네비게이션 */}
        <div className="flex gap-15">
          <Link
            href="/"
            className={clsx("nav-item", pathname === "/" && "text-black!")}
          >
            일반과제
          </Link>
          <Link href="/financial-statements" className="nav-item">
            산업 전문화 과제
          </Link>
        </div>
      </div>
    </header>
  );
}
