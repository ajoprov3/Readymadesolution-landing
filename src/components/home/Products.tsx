import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "./icons";
import { Stagger, StaggerItem } from "@/components/motion";

type Variant = "light" | "boai" | "helix";

const VARIANTS: Record<
  Variant,
  { card: string; title: string; desc: string; tag: string; circle: string }
> = {
  light: {
    card: "border border-secondary-100 bg-secondary-0",
    title: "text-secondary-900",
    desc: "text-[#777777]",
    tag: "border-[#b9b9b9] text-[#777777]",
    circle: "border-[#b9b9b9] text-secondary-900",
  },
  boai: {
    card: "bg-secondary-900",
    title: "text-secondary-100",
    desc: "text-white/[0.66]",
    tag: "border-white/[0.22] text-white/[0.82]",
    circle: "border-white/[0.28] text-white",
  },
  helix: {
    card: "bg-secondary-900",
    title: "text-white",
    desc: "text-neutral-300",
    tag: "border-[#b9b9b9] text-secondary-300",
    circle: "border-secondary-300 text-white",
  },
};

type Card = {
  title: string;
  desc: string;
  tags: string[];
  img: string;
  imgW: number;
  imgH: number;
  cardW: string;
  variant: Variant;
  descW?: string;
  padB?: string;
};

const CARDS: Card[][] = [
  [
    {
      title: "Ajopro 3.0 - Fintech App",
      desc: "A full redesign of the Ajopro fintech contribution & planning platform - smoother onboarding, clearer wallets and automated payouts.",
      tags: ["Fintech", "Mobile App", "Redesign"],
      img: "/assets/home/product-ajopro.png",
      imgW: 662,
      imgH: 322,
      cardW: "lg:w-[664px]",
      variant: "light",
      descW: "max-w-[432px]",
    },
    {
      title: "BO AI - Sales Assistant",
      desc: "An AI assistant that wrote product copy and live upsell prompts across a large, unoptimized catalog.",
      tags: ["AI", "Web App"],
      img: "/assets/home/product-bo-ai.png",
      imgW: 561,
      imgH: 318,
      cardW: "lg:w-[563px]",
      variant: "boai",
      descW: "max-w-[470px]",
    },
  ],
  [
    {
      title: "Helix Call - Cloud Telephony",
      desc: "Inbound and outbound routing, live analytics and QA unified into one cloud platform.",
      tags: ["SaaS", "Telephony"],
      img: "/assets/home/product-helix-call.png",
      imgW: 561,
      imgH: 338,
      cardW: "lg:w-[563px]",
      variant: "helix",
      descW: "max-w-[425px]",
      padB: "pb-[30px]",
    },
    {
      title: "Botaplace - E-Commerce Platform",
      desc: "A full migration to hosted storefronts, integrated payments and unified inventory and orders for a multi-brand retailer.",
      tags: ["E-Commerce", "Payments", "Web"],
      img: "/assets/home/product-botaplace.png",
      imgW: 662,
      imgH: 338,
      cardW: "lg:w-[664px]",
      variant: "light",
      descW: "max-w-[440px]",
      padB: "pb-[30px]",
    },
  ],
];

function ProductCard({ card }: { card: Card }) {
  const v = VARIANTS[card.variant];
  return (
    <Link
      href="/projects"
      className={`liftable flex w-full flex-col overflow-hidden rounded-[24px] p-px lg:h-full ${v.card}`}
    >
      <Image
        src={card.img}
        alt={card.title}
        width={card.imgW}
        height={card.imgH}
        className="w-full rounded-t-[23px]"
      />
      <div
        className={`flex flex-1 flex-col px-[24px] pt-[20px] ${card.padB ?? "pb-[24px]"}`}
      >
        <h3
          className={`pb-[7px] font-sans text-[22px] font-extrabold leading-[27px] tracking-[-0.5px] ${v.title}`}
        >
          {card.title}
        </h3>
        <p
          className={`pb-[18px] font-sans text-[14.5px] leading-[23.2px] ${v.desc} ${card.descW ?? ""}`}
        >
          {card.desc}
        </p>
        <div className="mt-auto flex w-full items-center justify-between">
          <div className="flex h-[29px] flex-wrap items-start gap-x-[8px]">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className={`flex h-full items-center rounded-full border px-[14px] py-[7px] font-sans text-[12px] font-semibold ${v.tag}`}
              >
                {tag}
              </span>
            ))}
          </div>
          <span
            className={`flex size-[46px] items-center justify-center rounded-full border ${v.circle}`}
          >
            <ArrowUpRight className="size-[17px]" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Products() {
  return (
    <section
      id="products"
      className="mx-auto w-full max-w-[1440px] px-[80px] py-[40px] max-lg:px-6"
    >
      <div className="flex flex-col gap-[14px]">
        <div className="flex items-center justify-center self-start rounded-full bg-primary-100 px-[24px] py-[10px]">
          <span className="font-sans text-[16px] font-medium italic uppercase leading-[24px] text-secondary-900">
            What we do
          </span>
        </div>
        <div className="flex w-full items-start justify-between max-lg:flex-col max-lg:gap-4">
          <h2 className="w-[545px] max-w-full text-[58px] font-bold leading-[68px] text-secondary-800 max-lg:text-[38px] max-lg:leading-[1.2]">
            Products we built
          </h2>
          <Link
            href="/projects"
            className="pressable flex items-center gap-[8px] rounded-full border border-[#5d5d5d] px-[21px] py-[13px] text-[16px] leading-[24px] text-[#0e0f0c]"
          >
            All products
            <ArrowRight className="size-[20px] text-[#5d5d5d]" />
          </Link>
        </div>
      </div>
      <Stagger className="mt-[32px] flex flex-col gap-[32px]">
        {CARDS.map((row, i) => (
          <div
            key={i}
            className="flex w-full gap-[48px] max-lg:flex-col max-lg:gap-[32px]"
          >
            {row.map((card) => (
              <StaggerItem
                key={card.title}
                className={`flex w-full ${card.cardW}`}
              >
                <ProductCard card={card} />
              </StaggerItem>
            ))}
          </div>
        ))}
      </Stagger>
    </section>
  );
}
