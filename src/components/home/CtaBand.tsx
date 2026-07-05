/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight } from "./icons";
import { Reveal } from "@/components/motion";

export default function CtaBand() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-[80px] py-[32px] max-lg:px-6">
      <Reveal>
        <div className="relative w-full overflow-hidden rounded-[28px] bg-[#0a0d08] px-[40px] pb-[78px] pt-[77px] max-lg:px-6 max-lg:py-[52px]">
          {/* real background layers exported from Figma (nodes 41:1338, 57:3573, 57:3575) */}
          <img
            src="/assets/home/cta-band-bg.png"
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          <img
            src="/assets/home/cta-glow-left.png"
            alt=""
            className="pointer-events-none absolute left-0 top-0 max-lg:hidden"
            style={{ width: 430.1, height: 297.71 }}
          />
          <img
            src="/assets/home/cta-glow-right.png"
            alt=""
            className="pointer-events-none absolute right-0 max-lg:hidden"
            style={{ top: 111.94, width: 437.1, height: 317.74 }}
          />
          <div className="relative flex w-full flex-col items-center gap-[17px]">
            <h2 className="text-center text-[58px] font-bold leading-[56px] text-secondary-0 max-lg:text-[38px] max-lg:leading-[1.1]">
              Ready to transform
              <br />
              your business?
            </h2>
            <p className="text-center font-sans text-[18px] leading-[28.8px] text-neutral-300">
              Tell us about your goals and we&apos;ll map the right products and{" "}
              <br className="max-lg:hidden" />
              projects to get you there.
            </p>
            <div className="flex flex-wrap items-start justify-center gap-x-[13px] pt-[17px] max-lg:gap-y-3">
              <Link
                href="/consultation"
                className="pressable flex h-[53px] items-center gap-[9px] rounded-full bg-secondary-0 px-[30px] font-sans text-[16px] font-bold text-secondary-900"
              >
                Book a consultation
                <ArrowRight className="size-[18px]" />
              </Link>
              <Link
                href="/projects"
                className="pressable flex h-[53px] items-center justify-center rounded-full border border-secondary-300 px-[31px] font-sans text-[16px] font-semibold text-secondary-0"
              >
                Browse our work
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
