/* Trusted-by strip. Brands we have marks for render as logos; the rest stay text. */
type Item =
  | { type: "text"; label: string }
  | { type: "logo"; src: string; alt: string; h: number };

const ITEMS: Item[] = [
  { type: "logo", src: "/assets/home/brand-bota.png", alt: "Bota", h: 28 },
  { type: "text", label: "Rakomi" },
  { type: "logo", src: "/assets/home/brand-ajopro.svg", alt: "Ajopro", h: 26 },
  { type: "text", label: "BO" },
  { type: "logo", src: "/assets/home/brand-helixcall.png", alt: "Helixcall", h: 23 },
  { type: "logo", src: "/assets/home/brand-zumrail.png", alt: "ZumRail", h: 32 },
  { type: "logo", src: "/assets/home/brand-yoursend.png", alt: "YourSend", h: 22 },
];

function LogoRow({ hidden }: { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-[110px] pr-[110px]"
      aria-hidden={hidden || undefined}
    >
      {ITEMS.map((item, i) =>
        item.type === "text" ? (
          <span
            key={i}
            className="whitespace-nowrap font-sans text-[23px] font-extrabold tracking-[-0.6px] text-[#777777]"
          >
            {item.label}
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={item.src}
            alt={item.alt}
            style={{ height: item.h }}
            className="w-auto shrink-0 object-contain"
          />
        ),
      )}
    </div>
  );
}

export default function LogosStrip() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[24px] border-y border-secondary-100 bg-secondary-0 px-[80px] pb-[40px] pt-[30px] max-lg:px-6">
      <p className="text-center text-[20px] leading-[30px] text-[#747474]">
        Trusted by companies that ship at scale
      </p>
      <div
        className="flex h-[44px] w-full items-center overflow-hidden"
        style={{
          /* soft edge fade so the loop blends instead of hard-cutting */
          maskImage:
            "linear-gradient(to right, transparent 0, #000 9%, #000 91%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, #000 9%, #000 91%, transparent 100%)",
        }}
      >
        <div className="flex w-max animate-marquee items-center">
          <LogoRow />
          <LogoRow hidden />
        </div>
      </div>
    </section>
  );
}
