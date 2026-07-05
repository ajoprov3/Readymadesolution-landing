import { Stagger, StaggerItem } from "@/components/motion";

type Testimonial = {
  quote: string;
  initials: string;
  name: string;
  role: string;
  dark?: boolean;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      '"Readymade rebuilt our onboarding around BO AI and our conversion jumped within the first month. They feel like an extension of our own team."',
    initials: "AO",
    name: "Amara Okafor",
    role: "VP Growth, Lumen Retail",
  },
  {
    quote:
      '"The Helix Call rollout cut our average wait time in half. The analytics gave our supervisors visibility they never had before."',
    initials: "DM",
    name: "Daniel Mensah",
    role: "COO, Northwind Telecom",
    dark: true,
  },
  {
    quote:
      '"Their managed dev team delivered our fintech platform ahead of schedule, and it has scaled cleanly ever since. They genuinely feel like part of our company."',
    initials: "PS",
    name: "Priya Sharma",
    role: "CTO, Vault Financial",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className={`flex w-full flex-col gap-[15px] rounded-[22px] lg:h-full ${
        t.dark
          ? "bg-secondary-900 p-[28px]"
          : "border border-[#e8ebe6] bg-white p-[29px]"
      }`}
    >
      <div
        className={`text-[16px] leading-[24px] ${
          t.dark ? "text-secondary-100" : "text-[#1fc16b]"
        }`}
      >
        ★★★★★
      </div>
      <p
        className={`max-w-[345px] text-[16px] leading-[24px] ${
          t.dark ? "text-secondary-100" : "text-secondary-800"
        }`}
      >
        {t.quote}
      </p>
      <div className="mt-auto flex items-center gap-[12px] pt-[7px]">
        <span className="flex size-[46px] items-center justify-center rounded-full bg-gradient-to-b from-primary-500 to-[#236c5a] text-[16px] font-bold text-secondary-100">
          {t.initials}
        </span>
        <div className="flex flex-col">
          <span
            className={`text-[16px] font-bold leading-[24px] ${
              t.dark ? "text-secondary-100" : "text-secondary-800"
            }`}
          >
            {t.name}
          </span>
          <span
            className={
              t.dark
                ? "text-[16px] leading-[24px] text-white/60"
                : "font-sans text-[12.5px] text-[#868685]"
            }
          >
            {t.role}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-[80px] py-[92px] max-lg:px-6">
      <div className="flex flex-col gap-[36px]">
        <div className="flex w-[580px] max-w-full flex-col gap-[14px] pt-[5px]">
          <div className="flex items-center justify-center self-start rounded-full bg-primary-100 px-[24px] py-[10px]">
            <span className="font-sans text-[16px] font-medium italic uppercase leading-[24px] text-secondary-900">
              In their words
            </span>
          </div>
          <h2 className="text-[44px] font-bold leading-[66px] text-secondary-900 max-lg:text-[34px] max-lg:leading-[1.2]">
            What our clients say
          </h2>
        </div>
        <Stagger className="flex w-full items-stretch justify-center gap-[20px] max-lg:flex-col">
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name} className="flex flex-1">
              <TestimonialCard t={t} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
