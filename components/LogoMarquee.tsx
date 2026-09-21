


const brandColors = [
  "#00E5FF",
  "#A78BFA",
  "#FF8A3D",
  "#34D399",
  "#FBBF24",
  "#38BDF8",
  "#E879F9",
  "#A3E635",
];

export default function LogoMarquee({ logos }: { logos: string[] }) {
  const row = [...logos, ...logos];
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <p className="mb-5 text-center text-[10.5px] font-bold tracking-[3px] text-muted">
        120+ MARKANIN BÜYÜME ORTAĞI
      </p>
      <div className="overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div
          className="marquee-track font-display text-[15px]"
          style={{ animationDuration: "40s" }}
        >
          {row.map((l, i) => {
            const c = brandColors[i % brandColors.length];
            return (
              <span
                key={i}
                className="inline-flex items-center gap-2.5 whitespace-nowrap font-semibold text-white/80 transition hover:text-white"
              >
                <span style={{ color: c, textShadow: `0 0 18px ${c}` }}>◆</span> {l}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
