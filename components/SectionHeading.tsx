import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-[640px] text-center" : "max-w-[640px]"}>
      <div
        className={`mb-3 flex items-center gap-2 text-[11px] font-bold tracking-[3px] text-electric ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="inline-block h-[2px] w-7 bg-electric" />
        {eyebrow}
      </div>
      <h2 className="font-display text-[clamp(30px,4.5vw,52px)] font-bold leading-tight">{title}</h2>
      {desc ? <p className="mt-3 text-muted">{desc}</p> : null}
    </Reveal>
  );
}
