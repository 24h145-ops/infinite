'use client';

import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col pt-8 px-4 sm:px-6 lg:px-8 bg-sole-black">
      <Link href="/" className="inline-flex items-center text-sole-grey hover:text-sole-white transition-colors mb-12 w-fit">
        <ArrowLeft size={16} className="mr-2" />
        <span className="font-mono text-[11px] uppercase tracking-[3px]">Back to Store</span>
      </Link>
      <div className="flex-1 flex items-center justify-center pb-24">
        {children}
      </div>
    </div>
  );
}
