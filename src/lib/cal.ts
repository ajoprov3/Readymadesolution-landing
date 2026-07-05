/** Shared types for the Cal.com booking wiring. */

export interface SlotDay {
  /** ISO date, e.g. "2026-07-08" */
  date: string;
  /** ISO datetime strings for available start times on that date */
  times: string[];
}

export interface SlotsResponse {
  slots: SlotDay[];
  /** true when generated sample slots are returned (missing env or Cal API error) */
  fallback?: boolean;
}

export interface BookRequest {
  name: string;
  email: string;
  timeZone: string;
  /** ISO datetime of the chosen slot */
  start: string;
  notes?: string;
  /** e.g. "AI & Automation project" or "HelixCall Product" */
  focus: string;
  branch: "build" | "product";
}

export interface BookResponse {
  success: true;
  /** true when no real Cal.com booking was created (missing env or Cal API error) */
  simulated?: boolean;
}
