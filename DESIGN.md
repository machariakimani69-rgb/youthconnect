# Design Brief

**Purpose**: Faith-based youth community hub for tracking service contributions, reading announcements, and celebrating collective works. Warm, inviting aesthetic optimized for mobile-first access by youth (14–25).

**Tone**: Warm + spiritual + inclusive. Approachable, joyful, intentional. Grounded faith-forward design that celebrates service without corporate transactionalism. Energy from warm color harmony, generous spacing, and community voice.

**Differentiation**: Teal-sage-amber color trio creates cohesive, welcoming aesthetic unique to faith-based communities. Soft card design with generous padding. Contribution flow emphasizes celebration over transaction. Announcement section elevated as community news hub.

## Color Palette

| Role | OKLCH | Purpose |
|------|-------|---------|
| Primary | `0.55 0.18 240` | Teal-blue for key actions, headers, CTA buttons |
| Secondary | `0.68 0.12 155` | Sage-green for contribution cards and service themes |
| Accent | `0.75 0.15 70` | Golden-amber for highlights, celebration, warmth |
| Success | `0.72 0.16 120` | Green-gold for approved contributions |
| Destructive | `0.58 0.15 25` | Soft rust for warnings |
| Neutral | `0.88 0.03 155` | Warm gray for muted text, borders |
| Foreground | `0.15 0.02 240` | Deep teal text |
| Background | `0.97 0.01 70` | Warm off-white |
| Card | `0.98 0.01 70` | Slightly brighter than background |

## Typography

| Layer | Font | Scale | Weight | Use |
|-------|------|-------|--------|-----|
| Display | Space Grotesk | 32px, 24px, 20px | 700 | Headings, announcement titles, section labels |
| Body | General Sans | 16px, 14px | 400–600 | Body text, labels, contribution details |
| Mono | Geist Mono | 14px | 400 | Timestamps, IDs, dates |

## Structural Zones

| Zone | Background | Border | Purpose |
|------|-----------|--------|---------||
| Header | `bg-primary border-b` | Teal with bottom divider | Community name, user context, logout |
| Content | `bg-background` | None | Primary content area |
| Announcement Card | `bg-card border border-border` | Subtle border | News, updates, admin voice |
| Contribution Card | `bg-card border-l-4 border-secondary` | Sage-green left accent | Service hours, achievements, approval status |
| CTA Zone | `bg-secondary` | None | Submit contribution, primary actions |
| Footer | `bg-muted/20 border-t` | Top border | Navigation, logout redundancy |

## Spacing & Rhythm

- **Touch targets**: Min 48px height for all buttons and interactive elements
- **Padding**: 1rem on mobile cards, 1.5rem on sections
- **Gap**: 1rem between announcements, 0.75rem between list items
- **Radius**: 8px default (soft, welcoming); 4px on inputs

## Component Patterns

- **Buttons**: `btn-primary` (teal for high-priority CTAs), `btn-secondary` (sage-green for submissions)
- **Cards**: Soft 8px radius, 1rem padding, subtle border or left-accent bar
- **Forms**: General Sans labels, sage-green focus ring, warm input borders
- **Badges**: Success (green-gold), Pending (muted), Approved (sage-green)

## Motion

- **Interaction**: Hover opacity-85, active scale-98 for buttons
- **Transition**: 0.3s cubic-bezier(0.4, 0, 0.2, 1) on hover/focus
- **No entrance animations** — speed priority on mobile

## Constraints

- All colors OKLCH tokens, no hex literals
- Minimum 4.5:1 contrast on text (AA)
- Mobile-first breakpoints: sm (640px), md (768px), lg (1024px)
- No full-page backgrounds or gradients
- Warm undertone throughout — no cool grays or sterile blues

## Signature Detail

Warm color harmony (teal + sage + amber) creates emotional resonance unique to faith-based contexts. Contribution cards feature left-accent sage-green bar — subtle visual celebration of service. Large touch targets and breathing space signal that youth community is valued and accessible.
