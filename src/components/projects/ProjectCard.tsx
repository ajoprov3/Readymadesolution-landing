import Image from "next/image";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  /** Figma card palette: rows 1-2 use "lightA"/"dark", row 3 uses "lightB" */
  palette: "lightA" | "lightB" | "dark";
  /** height of the padded image band (px, from Figma) */
  marginH: number;
  /** exact size of the rounded image box inside the band (px, from Figma) */
  imgH: number;
  imgW: number;
  /** image box corner radius (px, from Figma; default 16) */
  imgRadius?: number;
  /** max width of the description paragraph (px, from Figma) */
  descMaxW?: number;
  /** card border override (e.g. Helix: dark card with #EDECEC border) */
  borderColor?: string;
  /** arrow icon stroke override (e.g. Helix: #B9B9B9) */
  arrowColor?: string;
  /** external live-site URL; when set the card links out in a new tab */
  href?: string;
};

const PALETTES = {
  lightA: {
    card: "border-[#EDECEC] bg-[#FCFCFC]",
    title: "text-secondary-900",
    desc: "text-[#777777]",
    tag: "border-[#B9B9B9] text-[#777777]",
    circle: "border-[#B9B9B9]",
    arrow: "#171717",
  },
  lightB: {
    card: "border-[#E8EBE6] bg-white",
    title: "text-[#0E0F0C]",
    desc: "text-[#6B6D6A]",
    tag: "border-[#D7DBD3] text-[#454745]",
    circle: "border-[#CDD1C9]",
    arrow: "#0E0F0C",
  },
  dark: {
    card: "border-secondary-900 bg-secondary-900",
    title: "text-secondary-100",
    desc: "text-white/66",
    tag: "border-white/22 text-white/82",
    circle: "border-white/28",
    arrow: "#2EBE9B",
  },
} as const;

export function ArrowUpRight({ className, color }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 17 17" fill="none" className={className} aria-hidden="true">
      <path
        d="M4.95833 12.0417L12.0417 4.95833M12.0417 10.625V4.95833H6.375"
        stroke={color ?? "currentColor"}
        strokeWidth="1.41667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProjectCard({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  const p = PALETTES[project.palette];
  const cardClass = `liftable flex flex-col overflow-hidden rounded-[24px] border ${p.card} ${className}`;
  const cardStyle = project.borderColor
    ? { borderColor: project.borderColor }
    : undefined;
  const inner = (
    <>
      <div
        className="w-full px-[14px] pt-[14px] lg:h-(--mh)"
        style={{ "--mh": `${project.marginH}px` } as React.CSSProperties}
      >
        <div
          className="relative w-full overflow-hidden lg:h-(--ih) lg:w-(--iw)"
          style={
            {
              "--ih": `${project.imgH}px`,
              "--iw": `${project.imgW}px`,
              aspectRatio: `${project.imgW} / ${project.imgH}`,
              maxWidth: "100%",
              borderRadius: project.imgRadius ?? 16,
            } as React.CSSProperties
          }
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 660px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <h3
          className={`pb-[7px] font-sans text-[22px] font-extrabold leading-[27px] tracking-[-0.5px] ${p.title}`}
        >
          {project.title}
        </h3>
        <p
          className={`pb-[18px] font-sans text-[14.5px] leading-[23.2px] ${p.desc}`}
          style={project.descMaxW ? { maxWidth: project.descMaxW } : undefined}
        >
          {project.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-[14px] py-[7px] font-sans text-[12px] font-semibold leading-[15px] whitespace-nowrap ${p.tag}`}
              >
                {tag}
              </span>
            ))}
          </div>
          <span
            className={`flex size-[46px] shrink-0 items-center justify-center rounded-full border ${p.circle}`}
          >
            <ArrowUpRight className="size-[17px]" color={project.arrowColor ?? p.arrow} />
          </span>
        </div>
      </div>
    </>
  );

  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} — open live site`}
        className={cardClass}
        style={cardStyle}
      >
        {inner}
      </a>
    );
  }
  return (
    <div className={cardClass} style={cardStyle}>
      {inner}
    </div>
  );
}
