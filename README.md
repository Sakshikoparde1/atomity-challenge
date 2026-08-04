# Atomity Frontend Challenge

## Feature Chosen

**Option B** — Optimization Insights & Cost Intelligence section (0:45–0:55).

I interpreted the KubeCost product video and built a scroll-triggered, animated dashboard section that shows real-time Kubernetes cost metrics and AI-generated optimization insights. Rather than copying the video, I pushed the concept further with a dark data-dense layout, animated counters, staggered card reveals, and a savings roadmap panel.

---

## Approach to Animation

- **Scroll-triggered entrance** via Framer Motion's `whileInView` with `viewport: once` — cards animate in only once as they enter the viewport
- **Staggered delays** on metric cards (8ms per card) and insight cards (100ms per card) for a natural cascade feel
- **Animated number counting** — custom `AnimatedNumber` component uses `requestAnimationFrame` with cubic ease-out for smooth number countup
- **Hover micro-interactions** — cards lift on Y axis, insight cards slide right on hover, all with short 200ms easing
- **Glow effect** on card hover using radial gradient opacity transition
- `prefers-reduced-motion` fully respected — counting and entrance animations disabled when user prefers reduced motion

---

## Token Architecture

Design tokens defined as CSS custom properties in `globals.css` and referenced via TypeScript constants in `tokens/index.ts`. No hardcoded hex values in components.

```
CSS variables (globals.css) → tokens/index.ts → components
```

---

## Data Fetching & Caching

- **TanStack Query (React Query v5)** with 5-minute `staleTime` and 10-minute `gcTime`
- First load: shows skeleton loading state
- Revisit within 5 minutes: instant display, no network request
- Data from **JSONPlaceholder** (`/users` for metrics, `/posts` for insights) transformed into KPI and insight shapes
- Full loading, error, and success states handled

---

## Libraries Used

| Library | Why |
|---------|-----|
| Next.js 15 (App Router) | Framework with built-in routing and SSR |
| TypeScript | Type safety throughout |
| Tailwind CSS | Utility-first styling with design system |
| Framer Motion | Best-in-class React animation library |
| TanStack Query | Modern data fetching with caching |

---

## Project Structure

```
atomity-challenge/
├── app/
│   ├── globals.css          # CSS variables (design tokens)
│   ├── layout.tsx
│   └── page.tsx
├── tokens/
│   └── index.ts             # TypeScript token references
├── components/
│   ├── OptimizationSection.tsx  # Main feature section
│   ├── MetricCard.tsx           # KPI metric card
│   ├── InsightCard.tsx          # Optimization insight row
│   ├── AnimatedNumber.tsx       # Counting number animation
│   ├── SectionHeader.tsx        # Animated section heading
│   ├── Badge.tsx                # Status/category badge
│   ├── SkeletonCard.tsx         # Loading skeletons
│   └── Providers.tsx            # React Query provider
└── hooks/
    └── useMetrics.ts            # Data fetching hooks
```

---

## Modern CSS Features Used

- `clamp()` for fluid typography across all font sizes
- CSS custom properties (variables) for all design tokens
- `border-inline-start` logical property on insight cards
- `min()` inside `grid-template-columns` for intrinsic responsive grid
- `padding-block` / `padding-inline` logical properties
- `container-type: inline-size` on metric cards

---

## Tradeoffs

- Used JSONPlaceholder as data source — data is transformed to look like cloud metrics but is not real
- Dark mode only (no light/dark toggle due to time) — token architecture makes adding a toggle trivial
- No unit tests — would add with Vitest + Testing Library given more time

## What I Would Improve

- Add a live chart (spend over time) using a lightweight canvas library
- Add a light/dark theme toggle leveraging the existing token system
- Add skeleton-to-content crossfade transitions
- Connect to a real cloud cost API or mock server
