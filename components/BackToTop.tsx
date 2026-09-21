"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { clsx } from "@/lib/clsx";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Yukarı çık"
      className={clsx(
        "fixed bottom-5 left-5 z-[95] grid h-12 w-12 place-items-center rounded-full border border-line bg-card shadow-xl transition-all hover:border-electric/60",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
