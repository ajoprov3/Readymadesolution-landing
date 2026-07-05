# Readymade Solutions — Landing Site

Marketing site for Readymade Solution Inc: Home, Projects, About Us, and a
multi-step **Book Consultation** wizard backed by the Cal.com API. Built 1:1
from the Figma design.

## Stack

- **Next.js 15** (App Router) + **React** + **TypeScript**
- **Tailwind CSS v4**
- **Motion** (`motion/react`) for scroll reveals, hero entrances, and step transitions
- **Cal.com API v2** for consultation availability + booking
- Brand display font **Faktum Test** (self-hosted via `next/font/local`), Inter + Hanken Grotesk as UI/fallback

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, trusted-by logo marquee, products, testimonials, process, CTA |
| `/projects` | Project portfolio (cards link to live client sites) |
| `/about` | Company story, values, CTA |
| `/consultation` | Multi-step booking wizard (Build a project / Use a product branches) wired to Cal.com |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

## Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
|---|---|
| `CAL_API_KEY` | Cal.com API key (**server-only**, never exposed to the client). Create at https://app.cal.com/settings/developer/api-keys |
| `CAL_EVENT_TYPE_ID` | Numeric ID of the Cal.com event type for the 30-minute consultation |

The Cal.com routes (`/api/cal/slots`, `/api/cal/book`) read these on the server only.
If they're unset (or Cal.com errors), the wizard gracefully falls back to sample
time slots and a simulated booking so the UI still works in development.

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Notes

- The Faktum Test font files in `src/fonts/` are a licensed brand font — verify
  your license before deploying publicly.
- Deployable to Vercel with zero config; set the two `CAL_*` env vars in the
  project settings.
