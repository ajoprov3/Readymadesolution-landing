import { NextResponse } from "next/server";
import type { SlotDay, SlotsResponse } from "@/lib/cal";

export const dynamic = "force-dynamic";

function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Deterministic sample slots: next 5 business days, hourly 9:00–16:00. */
function fallbackSlots(): SlotDay[] {
  const days: SlotDay[] = [];
  const d = new Date();
  while (days.length < 5) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow === 0 || dow === 6) continue;
    const date = toDateStr(d);
    days.push({
      date,
      times: Array.from(
        { length: 8 },
        (_, i) => `${date}T${String(9 + i).padStart(2, "0")}:00:00`
      ),
    });
  }
  return days;
}

export async function GET(req: Request) {
  const apiKey = process.env.CAL_API_KEY;
  const eventTypeId = process.env.CAL_EVENT_TYPE_ID;

  let start: string;
  let end: string;
  try {
    const { searchParams } = new URL(req.url);
    start = searchParams.get("start") ?? new Date().toISOString();
    end =
      searchParams.get("end") ??
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    if (Number.isNaN(Date.parse(start)) || Number.isNaN(Date.parse(end))) {
      return NextResponse.json(
        { error: "Invalid start/end date" },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!apiKey || !eventTypeId) {
    const body: SlotsResponse = { slots: fallbackSlots(), fallback: true };
    return NextResponse.json(body);
  }

  try {
    const qs = new URLSearchParams({ start, end, eventTypeId });
    const res = await fetch(`https://api.cal.com/v2/slots?${qs.toString()}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "cal-api-version": "2024-09-04",
      },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Cal.com slots API responded ${res.status}`);
    }
    const json: unknown = await res.json();
    const data =
      json && typeof json === "object" && "data" in json
        ? (json as { data: unknown }).data
        : null;
    if (!data || typeof data !== "object") {
      throw new Error("Unexpected Cal.com slots response shape");
    }
    const slots: SlotDay[] = Object.entries(data as Record<string, unknown>)
      .map(([date, entries]) => ({
        date,
        times: Array.isArray(entries)
          ? entries
              .map((e) =>
                typeof e === "string"
                  ? e
                  : e && typeof e === "object" && "start" in e
                    ? String((e as { start: unknown }).start)
                    : null
              )
              .filter((t): t is string => t !== null)
          : [],
      }))
      .filter((day) => day.times.length > 0)
      .sort((a, b) => a.date.localeCompare(b.date));
    const body: SlotsResponse = { slots };
    return NextResponse.json(body);
  } catch (err) {
    console.error("cal/slots: falling back to sample slots:", err);
    const body: SlotsResponse = { slots: fallbackSlots(), fallback: true };
    return NextResponse.json(body);
  }
}
